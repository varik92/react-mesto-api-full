import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Footer from "./Footer";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards,
    onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <main>
                <section className="profile">
                    <div className="profile__main">
                        <div className="profile__avatar-container">
                            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                            <button className="profile__avatar-edit-button" onClick={onEditAvatar} />
                        </div>
                        <div className="profile__column">
                            <div className="profile__info">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button type="button" aria-label="Редактировать профиль"
                                    className="profile__edit-button" onClick={onEditProfile} />
                            </div>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                    </div>
                    <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace} />
                </section>
                <section className="elements">
                    <ul className="elements__list">
                        {cards.map((card) => {
                            return (
                                <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike}
                                    onCardDelete={onCardDelete} />
                            )
                        })}
                    </ul>
                </section>
            </main >
            <Footer />
        </>
    )
}