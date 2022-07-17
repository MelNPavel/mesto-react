import React, { useState, useEffect } from 'react';

import Header from '../components/Header.js';
import Main from './Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from './PopupWithForm.js';
import Card from './Card.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardFirst, setCardFirst] = useState([]);

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

    function cardsFirst(cards) {
        setCardFirst(cards);

    }

    return (
        <div className="page">
            <Header />
            <Main
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                getCardsFirst={cardsFirst}
            >

            {cardFirst.map((item) => {
                return (
                    <Card
                        key={item._id}
                        name={item.name}
                        link={item.link}
                        like={item.likes.length}
                        onCardClick={handleCardClick}
                    />)
            })}
            </Main>
            <Footer />
            <ImagePopup
                card={selectedCard} onClose={closeAllPopups}
            />
            <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input
                    id="type-name"
                    className="popup__input popup__input_type_name"
                    type="text"
                    name="nameProfile"
                    placeholder="Имя"
                    minlength="2"
                    maxlength="40"
                    required
                />
                <span class="popup__error type-name-error"></span>
                <input
                    id="type-about"
                    className="popup__input popup__input_type_about"
                    type="text"
                    name="aboutProfile"
                    placeholder="Кратко о себе"
                    minlength="2"
                    maxlength="400"
                    required
                />
                <span className="popup__error" id="type-about-error"></span>
                <button className="popup__button" type="submit">Сохранить</button>
            </PopupWithForm>

            <PopupWithForm name='add' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>

                <input
                    id="type-title"
                    className="popup__input popup__input_type_title"
                    type="text"
                    name="nameCard"
                    placeholder="Название"
                    required
                    minlength="2"
                    maxlength="30"
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
                <button className="popup__button popup__button_place_add" type="submit">Создать</button>
            </PopupWithForm>
            <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input
                    id="type-avatar"
                    className="popup__input popup__input_type_avatar"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    required
                />
                <span className="popup__error" id="type-avatar-error"></span>
                <button className="popup__button popup__button_type_avatar" type="submit">Сохранить</button>
            </PopupWithForm>

            {/* <PopupWithForm name = '' title = 'Обновить аватар' isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups}></PopupWithForm> */}

            <PopupWithForm name='consent' title='Вы уверены?' onClose={closeAllPopups}>
                <button className="popup__button popup__button_type_consent" type="submit">да</button>
            </PopupWithForm>
        </div>
    );
}

export default App;
