import React, {useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useAppSelector} from "../hooks/storeHooks";
import {selectUser} from "../store/slices/user";
import {addOrderRequest} from "../HTTPRequests/order/addOrderRequest";
import {toast} from "react-toastify";

interface IOrderFormData {
    firstName: string;
    lastName: string;
    deliveryAddress: string;
    phoneNumber: number;
    deliveryDate: string;
    paymentMethod: 'card' | 'cash';
}

const CheckoutPage: React.FC = () => {
    const user = useAppSelector(selectUser)
    const [formData, setFormData] = useState<IOrderFormData>({
        firstName: user.firstName,
        lastName: user.lastName,
        deliveryAddress: '',
        phoneNumber: user.mobilePhone,
        deliveryDate: '',
        paymentMethod: 'card', // значение по умолчанию для способа оплаты
    });
    const notifyError = (message: string) => toast.error(message);
    const notifySuccess = (message: string) => toast.success(message);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "deliveryDate") {
            const date = new Date(value + "T00:00:00Z").toISOString();
            setFormData(prev => ({
                ...prev,
                [name]: date,
            }));
            return
        }
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addOrderRequest(formData).then(() => notifySuccess("Заказ оформлен")).catch(() => notifyError("Не удалось оформить заказ"))
    };

    function getCurrentDateInMoscow() {
        // Создаем объект Date для текущего момента
        const now = new Date();

        // Получаем текущее время в миллисекундах
        const currentTime = now.getTime();

        // Получаем смещение московского времени от UTC в миллисекундах (UTC+3 часа)
        const offset = 3 * 60 * 60 * 1000;

        // Создаем новый объект Date, представляющий московское время
        const moscowTime = new Date(currentTime + offset);

        // Форматируем дату в формат YYYY-MM-DD
        const year = moscowTime.getUTCFullYear();
        const month = `0${moscowTime.getUTCMonth() + 1}`.slice(-2); // Месяцы начинаются с 0
        const day = `0${moscowTime.getUTCDate()}`.slice(-2);

        return `${year}-${month}-${day}`;
    }

    const currentDate = getCurrentDateInMoscow()

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2>Оформление заказа</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Адрес</Form.Label>
                            <Form.Control
                                type="text"
                                name="deliveryAddress"
                                required
                                value={formData.deliveryAddress}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="expirationDate">
                            <Form.Label>Дата окончания</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Введите дату"
                                name="deliveryDate"
                                min={currentDate} // Устанавливаем минимальную дату в UTC
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phoneNumber"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <fieldset>
                            <Form.Group>
                                <Form.Label as="legend">Способ оплаты</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Картой курьеру"
                                    name="paymentMethod"
                                    id="paymentCard"
                                    value="card"
                                    checked={formData.paymentMethod === 'card'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Наличными курьеру"
                                    name="paymentMethod"
                                    id="paymentCash"
                                    value="cash"
                                    checked={formData.paymentMethod === 'cash'}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </fieldset>

                        <Button variant="primary" type="submit">Оформить заказ</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
export default CheckoutPage;