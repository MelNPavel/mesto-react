import React, { useState, useEffect} from 'react';
import buttonEdit from '../image/button-edit.svg';
import buttonAdd from '../image/add-button.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { CardContext } from '../context/CardContext.js';
import api from '../utils/api.js';



function Main({onAddPlace, onEditProfile, onEditAvatar, cardClick}) {
    
    const [cards, setCards] = useState([]);
    
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        api.getTasksCards()
            .then(res => {
                setCards(res)
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
    }, [])

    function getCardsClick(card) {
        cardClick(card)
    }

    function handleCardLike(card) {
        const isLiked = card.likeUser.some(i => i.cardId === currentUser._id);
        api.likePut(card.cardId, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map(
                    (c) => c._id === card.cardId ? newCard : c))})
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
        api.likeUnPut(card.cardId, isLiked)
            .then((newCard) => {
                setCards((state) => state.map(
                (c) => c._id === card.cardId ? newCard : c))})
            .catch((err) => {
                console.log ('Ошибка' + err);
             })
    } 

    function handleCardDelete(card) {
        api.deleteCard(card.cardId)
            .then ((res) => {
                setCards(res)
                })                
            }
    

    return (
        <CardContext.Provider value={cards}>
            <main className="main">
                <section className="profile">
                    <div className="profile__item">
                        <a
                            className="profile__avatar"
                            onClick={onEditAvatar}
                            style={{ backgroundImage: `url(${currentUser.avatar})` }}
                        ></a>
                        <div className="profile__info">
                            <div className="profile__info-item">
                                <h1 className="profile__info-name">{currentUser.name}</h1>
                                <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                                    <img className="profile__edit-icon" src={buttonEdit} alt="Кнопка редактирования" />
                                </button>
                            </div>
                            <p className="profile__info-about">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" onClick={onAddPlace} >
                        <img className="profile__add-image" src={buttonAdd} alt="Кнопка добавления" />
                    </button>
                </section>
                
                <ul className="element">
                    {cards.map((item) => {
                        return (
                            <Card
                                key={item._id}
                                cardId={item._id}
                                name={item.name}
                                link={item.link}
                                likeUser={item.likes}
                                like={item.likes.length}
                                ownerId={item.owner._id}
                                onCardClick={getCardsClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />)
                    })}
                </ul>
            </main>
        </CardContext.Provider>
    )
};

export default Main;