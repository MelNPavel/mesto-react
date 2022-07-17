import React from 'react';
import { useState, useEffect } from 'react';
import buttonEdit from '../image/button-edit.svg';
import buttonAdd from '../image/add-button.svg';
import Card from './Card.js';
import api from '../utils/api.js';

function Main(props) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getTasksUser()
            .then((res) => {
                setUserName(res.name)
                setUserDescription(res.about)
                setUserAvatar(res.avatar)
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
              })
    }, [])

    useEffect(() => {
        api.getTasksCards()
            .then(res => {
                setCards(res)
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
    }, [])
    
   function getCardsClick(cards) {
        props.cardClick(cards)
    }

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__item">
                    <a
                        className="profile__avatar"
                        onClick={props.onEditAvatar}
                        style={{ backgroundImage: `url(${userAvatar})` }}
                    ></a>
                    <div className="profile__info">
                        <div className="profile__info-item">
                            <h1 className="profile__info-name">{userName}</h1>
                            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                                <img className="profile__edit-icon" src={buttonEdit} alt="Кнопка редактирования" />
                            </button>
                        </div>
                        <p className="profile__info-about">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace} >
                    <img className="profile__add-image" src={buttonAdd} alt="Кнопка добавления" />
                </button>
            </section>
            
            <ul className="element">
                {cards.map((item) => {
                    return (
                        <Card
                            key={item._id}
                            name={item.name}
                            link={item.link}
                            like={item.likes.length}
                            onCardClick={getCardsClick}
                        />)
                })}
            </ul>


        </main>
    )
};

export default Main;