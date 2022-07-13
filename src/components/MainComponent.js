import React from 'react';
import { useState } from 'react';
import buttonEdit from '../image/button-edit.svg';
import buttonAdd from '../image/add-button.svg';
import iconClose from '../image/Close-Icon.svg';
import api from '../utils/Api.js';

function MainComponent(props) {

    const [userName, setUserName] = useState ();
    const [userDescription, setUserDescription] = useState ();
    const [userAvatar, setUserAvatar] = useState ();

        api.getTasksUser()
        .then ((res) =>{
            console.log (res)
            userName = res.name 
            userDescription = res.about 
            userAvatar = res.avatar 
        })
       
    return (
        <main className="main">

      <section className="profile">
          <div className="profile__item">
              <a
               className="profile__avatar" 
               href={userAvatar} 
               onClick={props.onEditAvatar}
            //   background-image: url()
              >
              </a>
              <div className="profile__info">
                  <div className="profile__info-item">
                      <h1 className="profile__info-name">{userName}</h1>
                      <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                          <img className="profile__edit-icon"  src= {buttonEdit} alt="Кнопка редактирования"/>
                      </button>
                  </div>
                  <p className="profile__info-about">{userDescription}</p>
              </div>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlace} >
              <img className="profile__add-image" src={buttonAdd} alt="Кнопка добавления"/>
          </button>
      </section>

      <ul className="element">
      </ul>


            <template className="element__template">
            <li className="element__card">
                    <img className="element__img" src="#" alt="#"/>
                    <button className="element__card-remove" type="button"></button>
                    <div className="element__item">
                        <h2 className="element__title"></h2>
                    <div className="element__like-container">
                        <button className="element__like" type="button"></button>
                        <p className="element__like-count">0</p>
                    </div>
                    </div>
                </li>
            </template>




            <div className="popup popup_image_background">
                <div className="popup__image-container">
                    <figure className="popup__foto-block">
                        <img className="popup__foto" src="#" alt="#"/>
                        <figcaption className="popup__foto-name">Новое место</figcaption>
                        <button className= "popup__close popup__close_place_foto" type="button">
                            <img className="popup__close-img"  src={iconClose} alt="закрытие всплывающего окна"/>
                        </button>
                    </figure>
                </div>
            </div>

           


      </main>
    )
};

export default MainComponent;