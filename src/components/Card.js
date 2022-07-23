import React from 'react';

import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { CardContext } from '../context/CardContext.js';



function Card (props) {

   const currentUser = React.useContext(CurrentUserContext);
    // const card = React.useContext(CardContext);

   const isOwn = props.ownerId === currentUser._id;

    // // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
      `element__card-remove ${isOwn ? 'element__card-remove_visible' : 'element__card-remove_hidden'}`
    ); 

    function handleClick() {
        props.onCardClick(props);
      }

    return (
        <li className="element__card">
            <img className="element__img" src={props.link} alt={props.name} onClick = {handleClick}/>
            <button className={cardDeleteButtonClassName} type="button"></button>
            <div className="element__item">
                <h2 className="element__title">{props.name}</h2>
            <div className="element__like-container">
                <button className="element__like" type="button"></button>
                <p className="element__like-count">{props.like}</p>
            </div>
            </div>
        </li>
    )
}

export default Card;