export default function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_zoom-image ${card.link ? 'popup_opened' : ''}`} >
            <figure className="popup__figure">
                <button type="button" aria-label="Закрыть"
                    className="popup__button-close popup__button-close_type_figure" onClick={onClose}></button>
                <img src={card.link} alt={card.name} className="popup__zoom-image" />
                <figcaption className="popup__image-caption">{card.name}</figcaption>
            </figure>
        </div >
    )
}