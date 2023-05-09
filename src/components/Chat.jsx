import {useContext, useEffect, useState} from "react";
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";

export default function Chat(){
    const {user} = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const {currentChatId, setLastMessage, getChatById} = useContext(ChatContext)

    const [currentChat, setCurrentChat] = useState(getChatById(currentChatId))

    useEffect(() => {
        setCurrentChat(getChatById(currentChatId))
    }, [currentChatId])

    function sendMessage(event){
        event.preventDefault()
        if (message){
            const updatedChat = {...currentChat, messages: [...currentChat.messages, {message, sender: user.name}]}
            const initialChats = JSON.parse(localStorage.getItem('chats')).filter((v) => v.id !== currentChat.id)
            localStorage.setItem('chats', JSON.stringify([...initialChats, updatedChat]))
            setCurrentChat(updatedChat)
            setLastMessage(message)
            setMessage('')
        }
    }

    return (
        <div className='chat-window'>
            {
                !currentChat ?
                <p className='chat-window__no-chat'>Выберите чат...</p> :
                    <>
                        <form className='chat-window__form' onSubmit={sendMessage}>
                            <input type='text' className='chat-window__input'
                                   placeholder='Напишите сообщение'
                                   onChange={(e) => setMessage(e.target.value)}
                                   value={message}
                            />
                            <button className='chat-window__send'>></button>
                        </form>
                        <ul className='chat-window__messages'>
                            {currentChat.messages.map((v, i) =>
                                <li className={['chat-window__message', v.sender === user.name && 'self'].join(' ')} key={i}>
                                    <h3>{v.sender === user.name ? 'Вы' : v.sender}</h3>
                                    <p className='chat-window__message-text'>{v.message}</p>
                                </li>)
                            }
                        </ul>
                    </>
            }
        </div>
    )
}