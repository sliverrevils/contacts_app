
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom'
import ContactsPage from './Pages/contactsPage';
import MainPage from './Pages/mainPage'

export default function Router() {
    const auth=useSelector((state:{main:{auth:string}})=>state.main.auth);   

    return <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/contacts' element={auth?<ContactsPage />:<Navigate to='/' replace/>} />
        <Route path='*' element={<Navigate to='/' replace/>}/>
    </Routes>
}