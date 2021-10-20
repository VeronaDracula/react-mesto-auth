import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                       buttonText={props.buttonText} buttonDisable={props.buttonDisable}
                       children={
                           <>
                               <div className="form__section">
                                   <label htmlFor="name" className="form__label"></label>
                                   <input type="text" className="form__item form__item_type_name" id="name"
                                          name="name" placeholder="Имя"
                                          required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName}/>
                                   <span className="form__input-error" id="name-error"></span>
                               </div>
                               <div className="form__section">
                                   <label htmlFor="about" className="form__label"></label>
                                   <input type="text" className="form__item form__item_type_about" id="about" name="about" placeholder="О себе"
                                          required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription}/>
                                   <span className="form__input-error" id="about-error"></span>
                               </div>
                           </>
                       }/>
    );
}

export default EditProfilePopup;