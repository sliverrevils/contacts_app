import { useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { setAuth } from "../Redux/mainSlice";
import {RiUserAddLine} from "react-icons/ri";
import {RiUserShared2Line} from "react-icons/ri"

interface IAccaunt{
    id:string
    login:string
    password:string
}


export default function Authorization() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const message:{current:HTMLDivElement|undefined}=useRef();

    const dispatch=useDispatch();
  
    async function onSingIn() {
        const accaunts = await fetch('http://localhost:3001/accaunts').then(data=>data.json());
        console.log(accaunts.some((el:{login:string})=>el.login===login));

        if(accaunts.some((el:{login:string})=>el.login===login)){          
            message.current!.innerText='This login is already in use';
        }else{
           await fetch('http://localhost:3001/accaunts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ login, password })
            }).then(()=>message.current!.innerText='Congratulations! You are registered')
            .catch(()=>message.current!.innerText='Server error! Try again');           
        }       
    }

    async function onSingOn(){
        const accaunts:IAccaunt[] = await fetch('http://localhost:3001/accaunts').then(data=>data.json());
        if(accaunts.some((el:{login:string})=>el.login===login)){
            let index=accaunts.findIndex(el=>el.login===login);
            if(accaunts[index].password!==password){              
                message.current!.innerHTML=`<span class='error'>Invalid password</span>`;
                setPassword('');
            }else{
                dispatch(setAuth(login));
                sessionStorage.setItem('auth',login);
            }
        }else{          
          message.current!.innerText='There is no such user';
          message.current!.innerHTML=`<span class='error'>${login} is not registred </span>`;
        }
    }

    const strFix=(str:string):string=>str.trim();
    const isValidForm=():boolean=> /^[A-z]{1,3}\w{3,10}$/.test(login)&&password.length>4;
    

    return (
        <div className="Authorization">
            <div className="Authorization__from">
                <h1>Autorization</h1>
                <div className="Authorization__message" ref={message as {current:HTMLDivElement}}>Enter login and password</div>
                <label>
                    Login
                    <input type={'text'} onChange={e => setLogin(strFix(e.target.value))} value={login} />
                </label>

                <label>
                    Password
                    <input type={'password'} onChange={e => setPassword(strFix(e.target.value))} value={password} />
                </label>
                <div className="Authorization__buttons">
                <button onClick={onSingIn} disabled={!isValidForm()} style={{backgroundColor:'orange'}}>Sign in <RiUserAddLine/></button>
                <button onClick={onSingOn} disabled={!isValidForm()} style={{backgroundColor:'green'}}>Log in <RiUserShared2Line/></button>
                    
                </div>
            </div>

        </div>
    )
}