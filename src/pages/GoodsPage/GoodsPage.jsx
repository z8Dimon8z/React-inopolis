import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import {addProduct} from '../../redux/basket/basketSlice.js'
import {useDispatch} from 'react-redux'
import {getGood} from "../../constants/products";
import { v4 as uuidv4 } from 'uuid'
import background from "../../assets/images/trade-bg.jpg";
import './Goods.scss'



const GoodsPage = () => {
    const { id } = useParams() // useParams возвращает объект пары key/value (ключ/значение) параметров URL. динамическую навигацию задаем в файле при клике card.jsx
    const [good, setGood] = useState() // Локальный рендеринг карточки 
    const sum = useSelector(state => state.basket.pricesProducts)
    const count = useSelector(state => state.basket.basket.length)

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => { // добавление товара в редакс
        const goodWithUniqId = {...good, idx: uuidv4()}
        dispatch(addProduct(goodWithUniqId))
    }

    useEffect(() => { // получаем id карточки товара в файле products
        if (id) {
            const goodById = getGood(id) // функция прописана в файле products
            setGood(goodById) // рендерим новый элемент масива good
        }
    }, [id])

    if (!good) { // проверяем если есть товар то тогда грузим верстку
        return (
            <div>Loading...</div>
        )
    }

    return (
        <main className="main-trade" style={{backgroundImage: `url(${background})`}}>
            <div className="container">
                <section className="top top__trade_left">
                    <button className="top__pin" onClick={() => navigate(-1)}><img src="/images/back-icon.png" alt="Иконка назад"/></button>
                    <div className="top__box">
                        <div className="top__goods">
                            <p className="top__product"><span>{count}</span>&nbsp;товара</p>
                            <p className="top__total">на сумму <span>{sum}</span>&nbsp;&#8381;</p>
                        </div>
                        <button className="top__btn" onClick={() => navigate('/cart')}>
                            <img className="top__icon" src="/images/basket.svg" alt="Иконка корзины"/>
                        </button>
                    </div>
                </section>

                <ul className="trade">
                    <li className="trade__card">
                        <img className="trade__img" src={good.url} alt="Картинка товара"/>
                        <div className="trade__box">
                            <h2 className="trade__title">{good.title}</h2>
                            <p className="trade__description">{good.description}</p>

                            <div className="trade__good">
                                <div className="trade__products-price">
                                    <span className="trade__price">{good.price}&nbsp;&#8381;</span>
                                    <span
                                        className="trade__weight">&nbsp;/&nbsp;{good.weight ? `${good.weight} гр.` : `${good.quantity} шт.`}</span>
                                </div>
                                <button className="trade__btn" onClick={handleClick}>В корзину</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default GoodsPage;
