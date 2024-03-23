import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {hide, selectModalActive, selectModalDom} from "../store/slices/modal";
import "../styles/ModalStyle.css"

const Modal = () => {
    const dom = useAppSelector(selectModalDom)
    const active = useAppSelector(selectModalActive)
    const dispatch = useAppDispatch()

    function closeModal() {
        console.log(active)
        dispatch(hide(false))
    }

    return (
        <div className={`addModal ${active ? "active" : ""}`}>
            <div className={"addModal__content"} style={{position: "relative"}}>
                <ion-icon
                    name="close-circle-outline"
                    class="closeButton"
                    onClick={() => closeModal()}
                ></ion-icon>
                {dom}
            </div>
        </div>
    );
};

export default Modal;