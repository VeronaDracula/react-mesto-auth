import React from 'react';

function PopupWithForm(props) {

    return (
        <section className={props.isOpen ? `popup popup_type_${props.name} popup_is-opened` : `popup popup_type_${props.name}`}>
            <div className="popup__container">
                <button className="popup__close page__button" onClick={props.onClose}></button>
                <div className="popup__content">
                    <h2 className="popup__title">{props.title}</h2>
                    <form className="form" name={props.name} onSubmit={props.onSubmit}>
                        {props.children}
                        <button type="submit" className="form__save" disabled={props.buttonDisable}>{props.buttonText}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default PopupWithForm;
