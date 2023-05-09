import ChatsList from "../components/ChatsList";
import '../styles/Chat.css'
import {ModalProvider} from "../context/ModalContext";
import {ChatProvider} from "../context/ChatContext";
import Chat from "../components/Chat";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function ChatPage(){
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <ChatProvider>
            <div className='chat'>
                <p className='chat__logout' onClick={() => {
                    logout()
                    navigate('/login')
                }}>Выйти</p>
                <ModalProvider>
                    <ChatsList/>
                </ModalProvider>
                <Chat/>
            </div>
        </ChatProvider>
)
}
