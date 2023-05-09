import {createContext, useState} from "react";

export const ChatContext = createContext({})
export const ChatProvider = ({children}) => {
    const [currentChatId, setCurrentChatId] = useState(-1)
    const [lastMessage, setLastMessage] = useState('')

    function getChatById(id){
        if (id === -1){
            return null
        }
        const chats = JSON.parse(localStorage.getItem('chats'))
        return chats.find((v) => v.id === id)
    }

    function getChatsByUsername(username){
        const chats = JSON.parse(localStorage.getItem('chats') || '[]')
        return chats.filter((value) => value.users.includes(username))
    }


    return <ChatContext.Provider value={{
        currentChatId, setCurrentChatId, lastMessage, setLastMessage, getChatById, getChatsByUsername
    }}>
        {children}
    </ChatContext.Provider>
}