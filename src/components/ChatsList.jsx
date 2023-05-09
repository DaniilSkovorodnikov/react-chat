import '../styles/ChatsList.css'
import {useContext, useEffect, useState} from "react";
import {ModalContext} from "../context/ModalContext";
import Modal from "./Modal";
import {AuthContext} from "../context/AuthContext";
import ChatItem from "./ChatItem";
import {ChatContext} from "../context/ChatContext";

export default function ChatsList(){
    const {user} = useContext(AuthContext);
    const {setIsVisible} = useContext(ModalContext);
    const {lastMessage, getChatsByUsername} = useContext(ChatContext);

    const [chats, setChats] = useState(getChatsByUsername(user.name));
    const [newChatName, setNewChatName] = useState('');

    useEffect(() => {
        setChats(getChatsByUsername(user.name))
    }, [lastMessage]);

    function addChat(event){
        event.preventDefault();
        if (newChatName){
            const initialChats = JSON.parse(localStorage.getItem('chats') || '[]');
            const newChat = {
                users: [user.name, newChatName],
                messages: [],
                id: initialChats.length + 1
            };
            localStorage.setItem('chats', JSON.stringify([...initialChats, newChat]));
            setChats([...chats, newChat]);
            setIsVisible(false);
            setNewChatName('')
        }
    }

    return (
        <div className='chats'>
            <button className='chats__add' onClick={() => setIsVisible(true)}>Добавить чат...</button>
            <ul className='chats__list'>
                {chats.map((v) => <ChatItem chat={v}
                                               key={v.id}
                />)}
            </ul>
            <Modal>
                <form className='add-form'
                      onClick={(event) => event.stopPropagation()}
                      onSubmit={addChat}
                >
                    <input className='add-form__input'
                           placeholder='Никнейм собеседника...'
                           onChange={(event) => setNewChatName(event.target.value)}
                           value={newChatName}
                    />
                    <button className='add-form__btn' type='submit'>Добавить</button>
                </form>
            </Modal>
        </div>
    )
}