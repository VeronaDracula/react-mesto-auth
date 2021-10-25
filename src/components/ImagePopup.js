import React from 'react';

function ImagePopup(props) {
    return (
        <section className={props.card.link !== ''  ? 'popup popup_type_photo popup_is-opened' : 'popup popup_type_photo'}>
            <div className="popup-photo">
                <button className="popup__close page__button" onClick={props.onClose}></button>
                <figure className="popup-photo__image-container">
                    <img className="popup-photo__image" alt={props.card.name} src={props.card.link}/>
                    <figcaption className="popup-photo__title">{props.card.name}</figcaption>
                </figure>
            </div>
        </section>
    );
}

export default ImagePopup;