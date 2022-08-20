import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactsApp } from "../App/appSlice"
import { setAuth } from "../Redux/mainSlice";
import Contact from "./contact_item";
import { ImExit } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from "react-transition-group";


export interface IContact {
    id: 'string',
    name: 'string',
    number: 'string',
    user: 'string'
}

export default function Contacts() {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector((state: { main: { auth: string } }) => state.main.auth);
   

    const { useGetContactsQuery, useAddContactMutation, useDelContactMutation } = contactsApp;
    const { data } = useGetContactsQuery(auth);
    const [addContact] = useAddContactMutation();
    const [delContact] = useDelContactMutation();
    const [message, setMessage] = useState('add new or find');
    const messageDiv: { current: HTMLDivElement | undefined } = useRef();
    const nameDef=useDeferredValue(name);
    const numberDef=useDeferredValue(number);

    useEffect(() => {
        messageDiv.current!.innerHTML = message
        const timer = setTimeout(() => { setMessage('add new or find') }, 5000);
        return () => clearTimeout(timer);
    }, [message]);

    function nameFormat(str: string): string {
        return str.trim().split(' ').map(el => el[0].toUpperCase() + el.slice(1)).join(' ')
    }

    function isValidForm(): boolean {
        return name.trim().length > 2 && number.trim().length > 2
    }

    const onAddContact = useCallback(() => {
        const nameIdx = data.findIndex((el: IContact) => el.name.toLowerCase() === name.trim().toLowerCase());
        const numIdx = data.findIndex((el: IContact) => el.number === number);
        if (nameIdx >= 0 || numIdx >= 0) {
            if (nameIdx >= 0) {
                setMessage(`<span class='error'>${name} already exist with the number : ${data[nameIdx].number} !</span>`)
            }
            if (numIdx >= 0) {
                setName('');
                setMessage(`<span class='error'>this number has : ${data[numIdx].name} !</span>`);
            }
        } else {
            addContact({ name: nameFormat(name), number, user: auth }).unwrap();
            setNumber('');
            setName('');
        }
    }, [name, number]
    )
    function find(data: IContact[]): IContact[] {
        return data.filter(el => el.number.search(number) >= 0).filter(el => el.name.trim().toLowerCase().search(name.trim().toLowerCase()) >= 0);
    }    

    const list = useMemo(() => (<TransitionGroup>
        {data && find(data).sort((a, b) => a.name.localeCompare(b.name)).map((el: IContact) => (
            <CSSTransition key={el.id} timeout={300} classNames='item_rtc'>
                <Contact  {...{ delContact }} {...el} />
            </CSSTransition>
        ))}
    </TransitionGroup>),
        [data, nameDef, numberDef])

    return (
        <div className="Contacs_list">
            <div className="Contacs_list__auth">
                <div className="Contacs_list__auth__login"><FaUserCircle />{auth}</div>
                <span onClick={() => dispatch(setAuth(''))} className="Contacs_list__exit"><ImExit /></span>
            </div>
            <div className="Contacs_list__add-new">
                <div ref={messageDiv as { current: HTMLDivElement }}> </div>
                <input type={'text'} placeholder='name' onChange={e => setName(e.target.value)} value={name} />
                <input type={'number'} placeholder='tel' onChange={e => setNumber(e.target.value)} value={number} />
                <button onClick={onAddContact} disabled={!isValidForm()}>Add+</button>
            </div>          
            {list}
        </div>
    )
}

