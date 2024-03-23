import React, {useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {loginRequest} from "../HTTPRequests/verificationFunctions/LoginRequest";
import {setUser} from "../store/slices/user";
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {selectAppError, selectAppLoading, setLoading} from "../store/slices/appState";
import {infoUserRequest} from "../HTTPRequests/user/infoUserRequest";
import {toast} from "react-toastify";

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
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default LoginPage;
