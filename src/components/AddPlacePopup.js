import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [nameCard, setNameCard] = React.useState('');
    const [linkCardImage, setLinkCardImage] = React.useState('');

    function handleChangeNameCard(e) {
        setNameCard(e.target.value);
    }

    function handleChangeLinkCardImage(e) {
        setLinkCardImage(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: nameCard,
            link: linkCardImage
        });

        setNameCard('');
        setLinkCardImage('');
    }

    return (
        <PopupWithForm name="card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                       buttonText={props.buttonText} buttonDisable={props.buttonDisable}>
            <>
                <div className="form__section">
                    <label htmlFor="photo-name" className="form__label"></label>
                    <input type="text" className="form__item form__item_type_photo-name"
                           id="photo-name" name="name" placeholder="Название" required minLength="2"
                           maxLength="30" value={nameCard || ''} onChange={handleChangeNameCard}/>
                    <span className="form__input-error" id="photo-name-error"></span>
                </div>
                <div className="form__section">
                    <label htmlFor="link" className="form__label"></label>
                    <input type="url" className="form__item form__item_type_link" id="link"
                           name="link" placeholder="Ссылка на картинку" required
                           value={linkCardImage || ''} onChange={handleChangeLinkCardImage}/>
                    <span className="form__input-error" id="link-error"></span>
                </div>
            </>
        </PopupWithForm>
    );
}

export default AddPlacePopup;