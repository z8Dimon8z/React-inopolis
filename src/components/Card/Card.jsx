import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/basket/basketSlice.js'
import { v4 as uuidv4 } from 'uuid'
import './Card.scss';

const Card = ({ product }) => {
  const { url, title = 'Текст заглушка', description = 'Текст заглушка', price = 0, weight = 0, quantity, id} = product

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const clickCard = () => {
    navigate('/goods' + '/' + id) // работа с адресной строкой (Динамическая навигация)
  }

  const clickBtn = (e) => {
    e.stopPropagation() // отключаем событие
    const item = {
      id: id,
      idx: uuidv4(),
      title: title,
      url: url,
      price: price
    }
    dispatch(addProduct(item))
  }
  
  const aString = weight ? `${weight} гр.` : `${quantity} шт.`;

    return (
      <li onClick={clickCard} className="card menu__card">
        <img className="card__img" src={url} alt="Картинка товара"/>
            <h2 className="card__title">{title}</h2>
            <p className="card__description">{description}</p>

            <div className="card__box">
                <div className="card__products-price">
            <span className="card__price">{price}&nbsp;&#8381;</span>
            <span className="card__weight">&nbsp;/&nbsp;{aString}</span>
                </div>
            <button className="card__btn" onClick={clickBtn}>&#43;</button>
            </div>
        </li>

    );
}

export default Card

