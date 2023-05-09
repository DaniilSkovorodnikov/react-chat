import {createContext, useState} from "react";

export const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users') || '[]'))

    function login(userData){
        const existedUser = users.find((value) => value.name === userData.name)
        if (!existedUser){
            const updatedUsers = [...users, userData]
            setUser(userData)
            setUsers(updatedUsers)
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('users', JSON.stringify(updatedUsers))
        }
        else if(existedUser.password === userData.password){
            setUser(existedUser)
            localStorage.setItem('user', JSON.stringify(existedUser))
        }
        else {
            throw Error('Неверный пароль')
        }
    }

    function logout(){
        localStorage.removeItem('user')
        setUser({})
    }

    return <AuthContext.Provider value={{user, users, login, logout}}>
        {children}
    </AuthContext.Provider>
}