import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete page__button ${isOwn ? 'card__delete_visible' : 'card__delete_invisible'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `${isLiked ? 'card__like card__like_active' : 'card__like'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function cardDataRead() {
        props.onCardDataRead(props.card);
    }

    return (
        <li className="card">
            <button className={cardDeleteButtonClassName} type="button" onClick={function(){ props.onCardDelete(); cardDataRead(); props.onButtonPopupTextRead('Да')}}></button>
            <img className="card__image" alt={props.name} src={props.link} onClick={handleClick}/>
            <div className="card__image-info">
                <h2 className="card__title">{props.name}</h2>
                <div className="card__like-box">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="card__like-amount">{props.likes}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;