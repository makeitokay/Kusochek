import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import ShopPage from "./pages/ShopPage";
import Card from "./components/catalog/shopCards/Card";
import Modal from "./components/Modal";
import "./App.scss"
import RedirectToShopItem from "./components/navigate/RedirectToShopItem";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import AdminPage from "./pages/AdminPage";
import {RequireAuth} from "./components/navigate/PrivateRoute";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserProfile from "./pages/AccountPage";
import OnlyUnregisteredRoute from "./components/navigate/onlyUnregisteredRoute";
import {useAppDispatch} from "./hooks/storeHooks";
import {setUser} from "./store/slices/user";
import {infoUserRequest} from "./HTTPRequests/user/infoUserRequest";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        infoUserRequest().then(user => dispatch(setUser(user)))
    }, [])
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="login" element={
                        <OnlyUnregisteredRoute>
                            <LoginPage/>
                        </OnlyUnregisteredRoute>}/>
                    <Route path="reg" element={<RegisterPage/>}/>
                    <Route path="admin_panel" element={
                        <RequireAuth>
                            <AdminPage/>
                        </RequireAuth>}/>
                    <Route path="cart" element={<CartPage/>}/>
                    <Route path="checkout" element={<CheckoutPage/>}/>
                    <Route path="account" element={
                        <RequireAuth>
                            <UserProfile/>
                        </RequireAuth>}/>
                    <Route path="items/:id" element={<RedirectToShopItem/>}/>
                    <Route path="info" element={<InfoPage/>}/>
                    <Route path="shop" element={<ShopPage/>}/>
                    <Route path="shop/items/:id" element={<Card/>}></Route>
                    <Route path="shop/items/:id/:id2" element={<RedirectToShopItem/>}></Route>
                </Route>
            </Routes>
            <Modal/>
        </div>
    );
}

export default App;
