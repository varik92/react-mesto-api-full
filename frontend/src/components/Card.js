import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `element__delete-button ${isOwn ? 'element__delete-button_active' : ''}`;

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <div className="element__content">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <span className="element__like-count">{card.likes.length}</span>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
        </li>
    )
}