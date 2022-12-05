import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        if (currentUser.name && currentUser.about) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='edit-profile' title='Редактировать профиль' buttonSubmitText='Сохранить'
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" className="input input_type_name"
                required minLength="2" maxLength="40" onChange={handleChangeName} value={name} />
            <span id="name-error" className="popup__error"></span>
            <input type="text" name="about" id='about' className="input input_type_about" required minLength="2"
                maxLength="200" onChange={handleChangeDescription} value={description} />
            <span id="about-error" className="popup__error"></span>
        </PopupWithForm >)
}