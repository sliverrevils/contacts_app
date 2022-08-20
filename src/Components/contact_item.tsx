import { useCallback, useRef, useState } from "react";
import { contactsApp } from "../App/appSlice";
import { IContact } from "./contacts_list";
import { IoIosSave } from 'react-icons/io';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { RiDeleteBinFill } from 'react-icons/ri';


interface IContactProps extends IContact {
    delContact: (id: string) => void
}
export default function Contact(prop: IContactProps) {
    const [name, setName] = useState(prop.name as string);
    const [number, setNumber] = useState(prop.number as string);
    const [updateContact] = contactsApp.useUpdateContactMutation();
    const delBtnRef: { current: HTMLSpanElement | undefined } = useRef();
    const [active, setActive] = useState(false);

    const onUpdateContact = useCallback(() => {
        updateContact({ id: prop.id, contact: { name, number } });
    }, [name, number])
    const onSelectDel = useCallback(() => {
        const el: HTMLInputElement = delBtnRef.current!.parentElement!.children[0] as HTMLInputElement;
        el.style.textDecoration = 'line-through';
    }, [])
    const onLeaveDel = useCallback(() => {
        const el: HTMLInputElement = delBtnRef.current!.parentElement!.children[0] as HTMLInputElement;
        el.style.textDecoration = 'none';
    }, [])


    return (
        <div className="Contact" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <input type={'text'} onChange={e => setName(e.target.value)} value={name} onKeyDown={event => event.code === "Enter" && onUpdateContact()} />
            <a href={`tel:${number}`} id={`tel${number}`} className="Contact__phone" ><BsFillTelephoneForwardFill className="Contact__phone-btn" /></a>
            <input type={'number'} onChange={e => setNumber(e.target.value)} value={number} onKeyDown={event => event.code === "Enter" && onUpdateContact()} />
            {(prop.name !== name || prop.number !== number) && <IoIosSave onClick={onUpdateContact} className='Contact__update' />}
            {active && <span className="Contact__del" onClick={() => prop.delContact(prop.id)} ref={delBtnRef as { current: HTMLSpanElement }} onMouseEnter={onSelectDel} onMouseLeave={onLeaveDel} >
                <RiDeleteBinFill />
            </span>}
        </div>
    )

}