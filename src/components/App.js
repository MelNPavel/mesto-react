import React, { useState} from 'react';

import Header from '../components/Header.js';
import Main from './Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    
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

    return (
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
            <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText = 'Сохранить'>
                <input
                    id="type-name"
                    className="popup__input popup__input_type_name"
                    type="text"
                    name="nameProfile"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    required
                />
                <span className="popup__error type-name-error"></span>
                <input
                    id="type-about"
                    className="popup__input popup__input_type_about"
                    type="text"
                    name="aboutProfile"
                    placeholder="Кратко о себе"
                    minLength="2"
                    maxLength="400"
                    required
                />
                <span className="popup__error" id="type-about-error"></span>
            </PopupWithForm>
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
            <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText = 'Сохранить'>
                <input
                    id="type-avatar"
                    className="popup__input popup__input_type_avatar"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    required
                />
                <span className="popup__error" id="type-avatar-error"></span>
            </PopupWithForm>
            <PopupWithForm name='consent' title='Вы уверены?' onClose={closeAllPopups} buttonText = 'да' />
        </div>
    );
}

export default App;
