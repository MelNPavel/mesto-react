import React, {useState, useEffect} from 'react';

function Card (props) {

    function handleClick() {
        props.onCardClick(props);
      }

    return (
        <li className="element__card">
            <img className="element__img" src={props.link} alt={props.name} onClick = {handleClick}/>
            <button className="element__card-remove" type="button"></button>
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