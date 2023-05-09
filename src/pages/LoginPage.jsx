import '../styles/Login.css'
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function LoginPage(){
    const auth = useContext(AuthContext)

    const [user, setUser] = useState({
        name: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    function login(){
        const newUser = {
            ...user,
            id: auth.users.length + 1
        }
        try {
            auth.login(newUser);
            navigate('/')
        }
        catch (err){
            setError(err.message)
        }
    }

    return (
        <div className='login'>
            <h1 className='login__title'>Авторизация</h1>
            <form>
                <input className='login__input' type="text" onChange={(e) => setUser({...user, name: e.target.value})} value={user.name}/>
                <input className='login__input' type="password" onChange={(e) => setUser({...user, password: e.target.value})} value={user.password}/>
            </form>
            <p className='login__error'>{error}</p>
            <button className='login__submit' onClick={login}>Войти</button>
        </div>
    )
}