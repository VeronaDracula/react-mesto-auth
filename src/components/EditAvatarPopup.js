import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });

        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                       buttonText={props.buttonText} buttonDisable={props.buttonDisable}
                       children={
                           <div className="form__section">
                               <label htmlFor="avatar-link" className="form__label"></label>
                               <input ref={avatarRef} type="url" className="form__item form__item_type_avatar-link"
                                      id="avatar-link" name="avatar" placeholder="Ссылка на картинку"
                                      required defaultValue=''/>
                               <span className="form__input-error" id="avatar-link-error"></span>
                           </div>
                       }/>
    );
}

export default EditAvatarPopup;