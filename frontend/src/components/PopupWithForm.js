import React from "react"

export default function PopupWithForm({ name, title, children, buttonSubmitText, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h3 className="popup__title">{title}</h3>
                <button type="button" aria-label="Закрыть"
                    className="popup__button-close" onClick={onClose} />
                <form name={name} action="#" className={`popup__form popup__form_type_${name}`} noValidate
                    onSubmit={onSubmit} >
                    {children}
                    <button type="submit" aria-label={buttonSubmitText}
                        className={`popup__button-save popup__button-save_type_${name}`}
                        value={buttonSubmitText}>{buttonSubmitText}</button>
                </form>
            </div>
        </div>
    )
}