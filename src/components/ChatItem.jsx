import {useContext, useEffect, useMemo, useState} from "react";
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";

export default function ChatItem({chat}){
    const {user} = useContext(AuthContext)
    const {currentChatId, setCurrentChatId, lastMessage, setLastMessage} = useContext(ChatContext)

    const [chatLastMessage, setChatLastMessage] = useState('')

    const recepient = useMemo(() =>  chat.users.find((v) => v !== user.name), [])

    useEffect(() => {
        if (chat.id === currentChatId && lastMessage){
            setChatLastMessage(lastMessage)
        }
    }, [lastMessage])

    return (
        <div className={['chats__item', currentChatId === chat.id && 'active'].join(' ')} onClick={() => {
            setCurrentChatId(chat.id)
            setLastMessage('')
        }}>
            <h3 className='chats__subtitle'>{recepient}</h3>
            <p className='chats__last-message'>
                {
                    chatLastMessage || chat.messages[chat.messages.length - 1]?.message || 'Нет сообщений'
                }
            </p>
        </div>
    )
}