import React, {useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import {toast} from "react-toastify";
import {RegistrationRequest} from "../HTTPRequests/verificationFunctions/RegistrationRequest";

const RegisterPage: React.FC = () => {
    const notifyError = (message:string) => toast.error(message);
    const notifySuccess = (message:string) => toast.success(message);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const formDataObj = Array.from(formData.entries()).reduce((obj: { [key: string]: any }, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
        const {email, firstName, lastName, mobilePhone, password, secondPassword} = formDataObj;
        console.log(email, firstName, lastName, mobilePhone, password, secondPassword)
        if (password !== secondPassword) {
            notifyError("Пароли не совпадают")
        } else {
            RegistrationRequest({email, firstName, lastName, mobilePhone, password})
                .then(()=> notifySuccess("Зарегестрирован")).catch(()=> notifyError("Не удалось зарегестрироваться"))
        }
    };
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{paddingTop: "15vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <h2 className="text-center mb-4">Регистрация</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control name="firstName" type="text" placeholder="имя"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSecondName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control name="lastName" type="text" placeholder="Фамилия"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control name="mobilePhone" type="number" placeholder="Телефон"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Пароль"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control name="secondPassword" type="password" placeholder="Подтвердите пароль"/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Зарегестрироваться
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default RegisterPage;
