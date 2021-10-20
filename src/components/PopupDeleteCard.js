import React from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupDeleteCard(props) {

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        props.onDeleteCard(props.onCardDeleteData)
    }

    return (
        <PopupWithForm name="cardDelete" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                       buttonText={props.buttonText} buttonDisable={props.buttonDisable}
                       />
    );
}

export default PopupDeleteCard;