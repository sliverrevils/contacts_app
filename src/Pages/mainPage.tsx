import { useSelector } from "react-redux";

import {Navigate} from 'react-router-dom'
import Authorization from "../Components/authorization";

export default function MainPage() {
    const auth = useSelector((state: { main: { auth: string } }) => state.main.auth);
   

    return (
        <div className="Main">
            <div>          

                {!auth ? <Authorization /> : <Navigate to='/contacts' replace />}
            </div>
        </div>
    )
} 