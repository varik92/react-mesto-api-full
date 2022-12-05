import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm name='add-place' title='Новое место' buttonSubmitText='Создать' isOpen={isOpen}
            onClose={onClose} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Название" id="place" className="input input_type_place"
                required minLength="2" maxLength="30" onChange={handleChangeName} value={name} />
            <span id="place-error" className="popup__error"></span>
            <input type="url" name="link" placeholder="Ссылка на картинку" id="link"
                className="input input_type_link" required onChange={handleChangeLink} value={link} />
            <span id="link-error" className="popup__error"></span>
        </PopupWithForm>
    )
}