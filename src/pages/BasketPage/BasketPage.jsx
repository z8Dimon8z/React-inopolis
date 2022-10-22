import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { removeProductBasket } from '../../redux/basket/basketSlice.js'
import './BasketPage.scss';

function BasketPage() {

  const basket = useSelector(state => state.basket.basket)
  const sum = useSelector(state => state.basket.pricesProducts)

  let navigate = useNavigate()
  
  const dispatch = useDispatch()

  const handleClick = (idx) => {
    const item = {
      idx: idx
    }
    dispatch(removeProductBasket(item))
  }
    return (
        <div className="basket">
            <header className='basket__header container'>
                <button className="basket__pin" onClick={() => navigate(-1)}><img src="images/back-icon.png" alt="Иконка назад" /></button>
                <h1 className="basket__title">Корзина с выбранными товарами</h1>
            </header>
            <main>

                <ul className="basket__list">

                    {
                      basket.map((goods, index) =>
                            <li key={index} className='good basket__item'>
                                <div className="good__main">
                                    <img className='good__img' src={goods.url} alt=""/>
                                    <h3 className='good__title'>{goods.title}</h3>
                                </div>

                                <div className="good__box">
                                    <span className='good__price'>{goods.price}&nbsp;&#8381;</span>
                            <button className='good__btn' onClick={() => handleClick(goods.idx)}>X</button>
                                </div>
                            </li>
                        )
                    }

                </ul>

            </main>
            <div className="footer">
                <div className="footer__box">
            <h2 className="footer__title">Заказ на сумму:<span>{sum}&nbsp;&#8381;</span></h2>
                    <button className='footer__btn'>Оформить заказ</button>
                </div>
            </div>
        </div>
    );
}

export default BasketPage;

/*
    const [list, setList] = useState([])
    // непонятно как сделать обновление суммы из локал сторидж спросить на созвоне
    const [sum, setSum] = useState(0)

    useEffect(() => {
        const savedList = localStorage.getItem('savedList') // получаем прокликаные кнопки из локал сторидж
        if (savedList) { // проверяем есть ли что в локал сторидж (может и ничего не быть)
            const newList = JSON.parse(savedList);
            setList(newList)
            let newSum = 0;
            newList.forEach(element => {
                newSum = newSum + element.price
            });
            setSum(newSum)
        }
    }, [])


    const handleClick = (id) => {

        setList(prevState => {
            const res = prevState.filter(x => x.id !== id) // сохраняем новый масив только тех элемнов id которых не совпал
            localStorage.setItem('savedList', JSON.stringify(res)) // переписываем локал сторидж
            window.location.reload();

            return res
        })
    }
*/

// в кнопке
/*
    setList(prevState => {
      const res = prevState.filter(x => x.id !== id) // сохраняем новый масив только тех элемнов id которых не совпал
      localStorage.setItem('savedList', JSON.stringify(res)) // переписываем локал сторидж
      window.location.reload();

      return res
    })
    */