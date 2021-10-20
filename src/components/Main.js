import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from './Card.js';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-box" >

                        <img className="profile__avatar" alt="аватар"  src={currentUser.avatar}/>

                            <div className="profile__avatar-hover">
                                <button className="profile__edit-avatar-button" type="button" onClick={function(){props.onEditAvatar(); props.onButtonTextRead('Сохранить')}}></button>
                            </div>
                    </div>
                    <div className="profile__text">
                        <div className="profile__name-edit">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button page__button" type="button" onClick={function(){props.onEditProfile(); props.onButtonTextRead('Сохранить')}}></button>
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button page__button" type="button" onClick={function(){props.onAddPlace(); props.onButtonTextRead('Создать')}}></button>
            </section>

            <section className="gallery">
                <ul className="cards">
                    {props.cards.map((card) => (<Card card={card}
                                                      name={card.name}
                                                      link={card.link}
                                                      likes={card.likes.length}
                                                      key={card._id}
                                                      onCardClick={props.onCardClick}
                                                      onCardLike={props.onCardLike}
                                                      onCardDelete={props.onCardDelete}
                                                      onCardDataRead={props.onCardDataRead}
                                                      onButtonPopupTextRead={props.onButtonTextRead}/>)
                                               )}
                </ul>
            </section>
        </main>
    );
}

export default Main;