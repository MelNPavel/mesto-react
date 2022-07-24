import React, { useState, useEffect} from 'react';


import Header from '../components/Header.js';
import Main from './Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js'
import { EditProfilePopup } from './EditProfilePopup.js'
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { CardContext } from '../context/CardContext.js'


function App() {

    
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [currentUser, setcurrentUser] = useState([]);
    const [avatarState, setAvatarState] = useState('');

    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setcurrentUser(res)
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
              })
    }, [])

   

    

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }  

    function handleUpdateUser(data) {
        api.addUser(data)
            .then((res) => {
                setcurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
    }

    function handleUpdateAvatar(data) {
        api.avatar(data)
            .then((res) => {
                setcurrentUser(res)

                closeAllPopups()
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>            
            <div className="page">
                <Header />
                <Main
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    cardClick={handleCardClick}                    
                />

                <Footer />
                <ImagePopup
                    card={selectedCard} onClose={closeAllPopups}
                />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <PopupWithForm name='add' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText = 'Создать'>
                    <input
                        id="type-title"
                        className="popup__input popup__input_type_title"
                        type="text"
                        name="nameCard"
                        placeholder="Название"
                        required
                        minLength="2"
                        maxLength="30"
                    />
                    <span className="popup__error" id="type-title-error"></span>
                    <input
                        id="type-image"
                        className="popup__input popup__input_type_image"
                        type="url"
                        name="linkCard"
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span className="popup__error" id="type-image-error"></span>
                </PopupWithForm>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
                <PopupWithForm name='consent' title='Вы уверены?' onClose={closeAllPopups} buttonText = 'да' />
            </div>            
        </CurrentUserContext.Provider>
    );
}

export default App;
