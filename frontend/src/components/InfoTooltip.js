import React from "react";

export default function InfoTooltip({ onClose, isOpen, isSuccessful }) {
    return (
        <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`} >
            <div className="popup__container">
                <button type="button" aria-label="Закрыть"
                    className="popup__button-close popup__button-close_type_info" onClick={onClose}></button>
                <div className={`popup__status ${isSuccessful ? 'popup__status_success' : 'popup__status_fail'}`}></div>
                <p className="popup__message">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
            </div>
        </div >
    )
}