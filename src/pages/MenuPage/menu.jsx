// import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useSelector} from 'react-redux'
import Card from '../../components/Card/Card.jsx';
import {products} from "../../constants/products.js";
import {routes} from "../../App";
import './Menu.scss';

function MenuPage() {
    let navigate = useNavigate()

    const {isAuth} = useSelector(state => state.user)
    const {pricesProducts} = useSelector(state => state.basket)
    const {basket} = useSelector(state => state.basket)


    if (isAuth === false) { // если пользователь не зарегистрирован то выводим верстку
        return (
            <div className="warning">
                <h1 className="warning__title">Вход запрешен! Сначала войдите на сайт</h1>
                <button className="warning__btn" onClick={() => navigate(routes.login)}>Регистрация</button>
            </div>
        )
    }

    return (
        <main className="main">
            <div className="container">
                <section className="top">
                    <h1 className="top__title">наша продукция</h1>
                    <div className="top__box">
                        <div className="top__goods">
                            <p className="top__product"><span>{basket.length}</span>&nbsp;товара</p>
                            <p className="top__total">на сумму <span>{pricesProducts}</span>&nbsp;&#8381;</p>
                        </div>
                        <button className="top__btn" onClick={() => navigate('/cart')}>
                            <img className="top__icon" src="images/basket.svg" alt="Иконка корзины"/>
                        </button>
                    </div>
                </section>

                <section className="menu">
                    <ul className="menu__list">
                        {products.map(product => { // перебераем масив данных products
                            const {id} = product; // дискруируем объект
                            return (
                                <Card
                                    product={product}
                                    key={id}
                                />
                            )
                        })}
                    </ul>
                </section>
            </div>
        </main>
    );
}

export default MenuPage;
