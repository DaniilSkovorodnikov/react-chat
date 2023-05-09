import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function RequireAuth({children}){
    const isLoggedIn = localStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn){
            navigate('/login')
        }
    }, [])

    return isLoggedIn ? children : <></>
}