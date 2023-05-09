import '../styles/Modal.css'
import {useContext} from "react";
import {ModalContext} from "../context/ModalContext";

export default function Modal({children}){
    const {isVisible, setIsVisible} = useContext(ModalContext)

    return (
        <div className={['modal', isVisible && 'visible'].join(' ')} onClick={() => setIsVisible(false)}>
            {children}
        </div>
    )
}