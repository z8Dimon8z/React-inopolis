import React, {useEffect} from "react";
import {Link, Route, Routes, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuth} from "./redux/user/userSlice";
import MainPage from "./pages/MainPage/MainPage.jsx";
import MenuPage from "./pages/MenuPage/Menu.jsx";
import BasketPage from "./pages/BasketPage/BasketPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import GoodsPage from "./pages/GoodsPage/GoodsPage.jsx";
import './App.scss';

export const routes = { // прописали пути в объект для стабильности
    main : '/',
    menu : '/menu',
    cart: '/cart',
    login: '/login',
    goods : '/goods'
}

function App() {
    const {isAuth} = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => { // проверяем зарегестрирован ли пользователь
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')
        if (login && password) {
            dispatch(setIsAuth(true)) // сохраняем в store что пользователь вошел
        }

    }, [])

    return (
      <>
            <header className="header">
                <nav className="header__list">
                    <Link className="header__link" to={routes.main}>Main</Link>
                    <Link className="header__link" to={routes.menu}>Menu</Link>
                    <Link className="header__link" to={routes.cart}>Cart</Link>
                    {!isAuth && <Link className="header__link" to={routes.login}>Login</Link>}
                    {/* проверяем если пользователь зарегистрирован то убираем ссылку логин */}
                    {/* <Link className="header__link" to={routes.goods}>Goods</Link> */}
                </nav>
            </header>

            <Routes>
                <Route path="/" exact={true} element={<MainPage/>}/>
                <Route path="menu" exact={true} element={<MenuPage/>}/>
                <Route path="cart" exact={true} element={<BasketPage/>}/>
                <Route path="login" exact={true} element={<LoginPage/>}/>
                <Route path="goods/:id" exact={true} element={<GoodsPage/>}/>
                {/* если пользователь в браузерной строке ввел неверный путь то перенаправляем на страницу наши продукты */}
                {/* :id - задаем параметр в адресной строке */}
                <Route
                    path="*"
                    element={<Navigate to={routes.menu} replace />}
                />
            </Routes>
        </>
      
    );
}

export default App;
