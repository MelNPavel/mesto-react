import React from 'react';
import buttonEdit from '../image/button-edit.svg';
import buttonAdd from '../image/add-button.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { CardContext } from '../context/CardContext.js';


function Main({onAddPlace, onEditProfile, onEditAvatar, cardClick}) {
    
    const currentUser = React.useContext(CurrentUserContext);
    const card = React.useContext(CardContext);

    function getCardsClick(card) {
        cardClick(card)
    }

    return (
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
                {card.map((item) => {
                    return (
                        <Card
                            key={item._id}
                            name={item.name}
                            link={item.link}
                            like={item.likes.length}
                            ownerId={item.owner._id}
                            onCardClick={getCardsClick}
                        />)
                })}
            </ul>


        </main>
    )
};

export default Main;