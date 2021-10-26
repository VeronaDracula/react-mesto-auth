import React from 'react';

function InfoTooltip(props) {
    return (
        <section className={props.isOpen ? `popup popup_type_${props.name} popup_is-opened` : `popup popup_type_${props.name}`}>
            <div className="popup__container">
                <button className="popup__close page__button" onClick={props.onClose}></button>
                <div className="popup__content popup__content_type_info-login">
                    <img className="popup-info-tooltip__image" alt="иконка информации о статусе регистрации" src={props.popupImg}/>
                    <p className="popup-info-tooltip__text">{props.popupText}</p>
                </div>
            </div>
        </section>
    );
}

export default InfoTooltip;