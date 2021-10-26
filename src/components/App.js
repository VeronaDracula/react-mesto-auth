import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import imgLoginYes from '../images/login-yes.png';
import imgLoginNo from '../images/login-no.png';

import ProtectedRoute from "./ProtectedRoute";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import PopupDeleteCard from './PopupDeleteCard.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import {api} from "../utils/Api";
import {apiAuth} from "../utils/AuthApi";


function App() {
    const emptyCard = {name : '', link: ''};
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(emptyCard);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});

    const [loggedIn, setLoggedIn] =React.useState(false);

    const [userEmail, setUserEmail] =React.useState('');

    const [infoTooltipImg, setInfoTooltipImg] =React.useState(imgLoginYes);
    const [infoTooltipText, setInfoTooltipText] =React.useState('Вы успешно зарегистрировались!');
    const [popupInfoTooltipOpen, setPopupInfoTooltip] =React.useState(false);

    //получение данных пользователя
    React.useEffect(() => {
        api
            .getUserInfoApi()
            .then(userData => {
                setCurrentUser(userData)
            })
            .catch(err => console.log(err))
    }, []);

    //открытие и закрытие попапов
    function handleEditAvatarClick(buttonText) {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleDeleteCardClick() {
        setIsDeleteCardPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleInfoTooltipOpen() {
        setPopupInfoTooltip(true);
        setInfoTooltipImg(imgLoginYes);
        setInfoTooltipText('Вы успешно зарегистрировались!');
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setSelectedCard(emptyCard);
        setPopupInfoTooltip(false);
    }

    //закрытие попапа по Esc
    React.useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])


    //обновление данных пользователя
    function handleUpdateUser(newUserData) {
        buttonState(buttonText, true);
        api
            .createNewUserInfoApi(newUserData)
            .then(newUserData => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                buttonState(buttonText, false)
            });
    }

    //обновление аватара пользователя
    function handleUpdateAvatar(newUserAvatar) {
        buttonState(buttonText, true);
        api
            .createNewUserAvatarApi(newUserAvatar)
            .then(newUserAvatar => {
                setCurrentUser(newUserAvatar);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                buttonState(buttonText, false)
            });
    }

    //добавление новой карточки
    function handleAddPlaceSubmit(newCard) {
        buttonState(buttonText, true);
        api
            .createCardApi(newCard)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                buttonState(buttonText, false)
            });
    }

    //запрос данных карточки
    React.useEffect(() => {
        api
            .getCards()
            .then(cardsData => {
                setCards(cardsData)
            })
            .catch(err => console.log(err))

    }, []);

    //лайки и дизлайки
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api
                .likeApi(card._id,)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.log(err))
        }

        else {
            api
                .deleteLikedApi(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.log(err))
        }
    }

    //удаление карточки через попап
    const [deleteCard, setDeleteCard] = React.useState([]);

    //получаем данные карточки, которую надо удалить
    function cardDataRead(cardDeleteData) {
        setDeleteCard(cardDeleteData)
    }
    //обработчик удаления карточки
    function handleDeleteCardSubmit(cardDataDelete) {
        api
            .deleteCardApi(cardDataDelete._id)
            .then(() => {
                setCards((state) => state.filter(cardData => cardDataDelete._id !== cardData._id))
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }


    const [buttonText, setButtonText] = React.useState('');
    const [buttonDisable, setButtonDisable] = React.useState(false);

    //Получаем изначальный текст кнопки
    function buttonTextRead(buttonText) {
        setButtonText(buttonText)
    }

    //Процесс загрузки
    function buttonState(button, isLoading2) {
        if(isLoading2) {
            setButtonText('Сохранение...');
            setButtonDisable(true);
        }

        else{
            setButtonText(button);
            setButtonDisable(false);
        }
    }


    //регистрация
    function handleRegister({email, password}) {
        apiAuth
            .register({email, password})
            .then(response => {
                console.log(response);
                handleInfoTooltipOpen();
            })
            .catch(err => {
                console.log(err);
                handleInfoTooltipOpen();
                setInfoTooltipImg(imgLoginNo);
                setInfoTooltipText('Что-то пошло не так!\n' + 'Попробуйте ещё раз.');
            })
    }

    //вход
    function handleLogin({email, password}){
        apiAuth
            .authorization({email, password})
            .then(data => {
                if(data.token) {
                    const token = data.token;
                    localStorage.setItem('jwt', token);
                    tokenCheck();
                    setLoggedIn(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const history = useHistory();

    React.useEffect(() => {
        if(loggedIn === true) {
            history.push('/');
        }

    }, [loggedIn]);

    React.useEffect(() => {
        tokenCheck();
    }, []);

    //проверка токена
    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt){
            apiAuth
                .getContent(jwt)
                .then((data) => {
                if (data){
                    setUserEmail(data.data.email);
                    setLoggedIn(true);
                }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    //выход
    function signOut(){
        localStorage.removeItem('jwt');
        history.push('/sign-in');
        setLoggedIn(false);
    }

    return (
    <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <Header loggedIn={loggedIn} email={userEmail} onSignOut={signOut}/>

                    <Switch>
                        <Route path="/sign-up">
                            <Register onRegister={handleRegister}/>
                        </Route>

                        <Route path="/sign-in">
                            <Login onLogin={handleLogin}/>
                        </Route>

                        <ProtectedRoute
                            path="/"
                            loggedIn={loggedIn}
                            component={Main}

                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteCardClick}
                            onCardDataRead={cardDataRead}
                            onButtonTextRead={buttonTextRead}
                        />


                    </Switch>

                    <Footer/>

                    <InfoTooltip isOpen={popupInfoTooltipOpen} onClose={closeAllPopups} popupText={infoTooltipText}
                                 popupImg={infoTooltipImg} name='infoTooltip'/>

                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
                                      buttonText={buttonText} buttonDisable={buttonDisable}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
                                     buttonText={buttonText} buttonDisable={buttonDisable}

                    />

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}
                                   buttonText={buttonText} buttonDisable={buttonDisable}/>

                    <PopupDeleteCard isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleDeleteCardSubmit}
                                     onCardDeleteData={deleteCard} buttonText={buttonText}/>

                </div>
            </div>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
