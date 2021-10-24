import React from 'react';
import Tooltip from '../images/login-yes.png';

function InfoTooltip(props) {
    return (
        <section className='popup popup_type_InfoTooltip'>
            <button className="popup__close page__button" onClick={props.onClose}></button>
            <img className="popup-info-tooltip__image" alt="" src={Tooltip}/>
            <p className="popup-info-tooltip__text">Вы успешно зарегистрировались!</p>
        </section>
    );
}

export default InfoTooltip;