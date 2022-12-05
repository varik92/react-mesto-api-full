import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <PopupWithForm name='change-avatar' title='Обновить аватар' buttonSubmitText='Сохранить'
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input type="url" name="avatar" placeholder="Ссылка на картинку" id="avatar"
                className="input input_type_avatar" required ref={avatarRef} />
            <span id="avatar-error" className="popup__error"></span>
        </PopupWithForm>
    )
}