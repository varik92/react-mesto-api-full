import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteConfirmPopup({ isOpen, onClose, onConfirm, card }) {
    function handleSubmit(e) {
        e.preventDefault();
        onConfirm(card);
    }
    return (
        <PopupWithForm name='delete-confirm' title='Вы уверены?' buttonSubmitText='Да'
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    )
}