import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setIsAuth, setCredentials } from "../../redux/user/userSlice";
import {routes} from "../../App";
import { usersDatabase } from "../../constants/userData.js";
import background from "../../assets/images/login-bg.jpg";
import './Login.scss';


/*
let total = [0, 1, 2, 3, 4].reduce(function (a, b) {
  return a + b
})
console.log('total', total);
// 1+2 =3 3+3 =6 6+4 = 10
*/
const LoginPage = () => {
    
  let navigate = useNavigate()
  const { isAuth } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // состояние инпута
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  // состояние были ли внутри инпута
  const [emailError, setEmailError] = useState('Email не может быть пустым')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  // сщстояние ошибок
  const [formValid, setFormValid] = useState(false)
  // состояние валидности формы
  const [message, setMessage] = useState('')
  // состояние ошибки входа

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }

  }, [emailError, passwordError])

  // отслеживание ввода данных в инпут
  const emailHandel = (e) => {
    setEmail(e.target.value)
    // валидация e-mail по регулярному вырожению
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некоретный email')
    } else {
      setEmailError('')
    }
  }

  const passwordHandel = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3) {
      setPasswordError('Пароль должен более 3 символов')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
    } else {
      setPasswordError('')
    }

  }

  const blurHandel = (e) => { // функция проверки увода курсора с инпута (если он пустой выводим ошибку(пустое поле)) берем из поля name
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break;

      case 'password':
        setPasswordDirty(true)
        break;

      default:
        break;
    }
  }

    const handleSubmit = (e) => {
        e.preventDefault();
      const hasUser = usersDatabase.find(user => user.login === email && user.password === password)
      if (!hasUser) {
            setMessage('Такого пользователя не сушествует')
            dispatch(setIsAuth(false))
            return
        }

      if (hasUser) {
        dispatch(setIsAuth(true))
        dispatch(setCredentials(hasUser))
        localStorage.setItem('login', email)
        localStorage.setItem('password', password)
        return navigate('/menu')
      }
    }

    if (isAuth)  {
        navigate(routes.menu)
        return null
    }
    
    return (
      <section className='authorization' style={{ backgroundImage: `url(${background})` }}>

        <form className='authorization__form form' onSubmit={handleSubmit}>
          <h1 className='form__title'>Вход</h1>
          <input className='form__input' 
          onChange={e => emailHandel(e)} 
          value={email} 
          onBlur={e => blurHandel(e)} 
          type="text" 
          name='email' 
          placeholder='Enter e-mail' />
          <div className="form__error">{(emailDirty && emailError) && <span>{emailError}</span>}</div>
          {/* проверяем если мы нажали на инпут и там есть ошибка то выводим этот блок */}
          <input className='form__input' 
          onChange={e => passwordHandel(e)} 
          value={password} 
          onBlur={e => blurHandel(e)} 
          type="password" 
          name='password' 
          placeholder='Enter пароль' />
          <div className="form__error">{(passwordDirty && passwordError) && <span>{passwordError}</span>}</div>
          <div className="form__box">
            <input className="form__checkbox" type="checkbox" id="checkbox" />
            <label className="form__label" for="checkbox"
            >Я согласен получать обновления на почту</label>
          </div>
          <span className='form__message'>{message}</span>
          <button className='form__btn' disabled={!formValid} type='submit'>Войти</button>
        </form>
      </section>
    );
};

export default LoginPage;
