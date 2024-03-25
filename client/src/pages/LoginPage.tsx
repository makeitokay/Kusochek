import React, {useState} from 'react';
import * as VKID from '@vkid/sdk';
import {Form, Button, Container} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {loginRequest} from "../HTTPRequests/verificationFunctions/LoginRequest";
import {setUser} from "../store/slices/user";
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {selectAppError, selectAppLoading, setLoading} from "../store/slices/appState";
import {infoUserRequest} from "../HTTPRequests/user/infoUserRequest";
import {toast} from "react-toastify";
import '../styles/VkButtonStyle.css';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch()
    let navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""})
    const notifyError = () => toast.error('Неправильный данные для входа');

    function login(e: any) {
        e.preventDefault()
        dispatch(setLoading(true))
        const userPromise = loginRequest({email: loginInfo.email, password: loginInfo.password})
        userPromise.then(() => {
                return infoUserRequest()
            }
        ).then((user => {
            dispatch(setUser(user))
            dispatch(setLoading(false))
            localStorage.setItem("isAuth", "true")
            navigate("/")
        })).catch((e) => {
            notifyError()
            console.log(e + "hh")
        })
    }

    const handleClick = () => {
        VKID.Auth.login()
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{paddingTop: "15vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <h2 className="text-center mb-4">Вход</h2>
                <Form onSubmit={(e) => {
                    login(e)
                }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите email"
                            value={loginInfo.email}
                            onChange={(e) => setLoginInfo({...loginInfo, email: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="пароль"
                            value={loginInfo.password}
                            onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})}
                        />
                    </Form.Group>
                    <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                        <Button variant="primary" type="submit" style={{background: "black", borderColor: "black"}}>
                            Войти
                        </Button>
                        <Button variant="primary" style={{background: "black", borderColor: "black"}}
                                onClick={() => navigate('/reg')}>
                            Регистрация
                        </Button>
                        <Button id="VKIDSDKAuthButton" className="VkIdWebSdk__button VkIdWebSdk__button_reset" onClick={handleClick}>
                            <div className="VkIdWebSdk__button_container">
                                <div className="VkIdWebSdk__button_icon">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54648 4.54648C3 6.09295 3 8.58197 3 13.56V14.44C3 19.418 3 21.907 4.54648 23.4535C6.09295 25 8.58197 25 13.56 25H14.44C19.418 25 21.907 25 23.4535 23.4535C25 21.907 25
           19.418 25 14.44V13.56C25 8.58197 25 6.09295 23.4535 4.54648C21.907 3 19.418 3 14.44 3H13.56C8.58197 3 6.09295 3 4.54648 4.54648ZM6.79999 10.15C6.91798 15.8728 9.92951 19.31 14.8932 19.31H15.1812V16.05C16.989 16.2332 18.3371 
           17.5682 18.8875 19.31H21.4939C20.7869 16.7044 18.9535 15.2604 17.8141 14.71C18.9526 14.0293 20.5641 12.3893 20.9436 10.15H18.5722C18.0747 11.971 16.5945 13.6233 15.1803 13.78V10.15H12.7711V16.5C11.305 16.1337 9.39237 14.3538 9.314 10.15H6.79999Z"
                                              fill="white"/>
                                    </svg>
                                </div>
                                <div className="VkIdWebSdk__button_text">
                                    Войти через VK ID
                                </div>
                            </div>
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default LoginPage;
