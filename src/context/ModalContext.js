import {createContext, useState} from "react";

export const ModalContext = createContext({});
export const ModalProvider = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);

    return <ModalContext.Provider value={{isVisible, setIsVisible}}>
        {children}
    </ModalContext.Provider>
}