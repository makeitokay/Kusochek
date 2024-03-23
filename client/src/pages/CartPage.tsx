import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
import CartItemComponent from '../components/cart/cartItemComponent';
import {CartItem} from '../types/cartItemComponent';
import {useNavigate} from "react-router-dom";
import {getCartRequest} from "../HTTPRequests/cart/getCartRequest";
import {deleteItemCartRequest} from "../HTTPRequests/cart/deleteItemCartRequest";
import {toast} from "react-toastify";

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const navigate = useNavigate()
    const notifyError = (message: string) => toast.error(message);
    const notifySuccess = (message: string) => toast.success(message);
    const handleRemove = (id: number) => {
        deleteItemCartRequest(id)
            .then(() => getCartRequest())
            .then((data) => {
                setCartItems(data.products)
                setTotalPrice(data.totalCost)
                notifySuccess("Товар удален")
            }).catch(() => notifyError("Не удалось удалить"))
    };

    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        getCartRequest().then((data) => {
            setCartItems(data.products)
            setTotalPrice(data.totalCost)
        })
    }, [])
    return (
        <Container>
            <Image
                onClick={() => navigate("/account")}
                style={{
                    background: "black",
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                    position: "absolute",
                    right: "10vw",
                    cursor: "pointer",
                    transform: "translateX(23%)"
                }}
                src="https://sneg.top/uploads/posts/2023-06/1687931407_sneg-top-p-prikolnie-avatarki-dlya-malchikov-vkontakt-5.jpg"
                roundedCircle
            />
            <h1>Корзина</h1>
            {cartItems.map(item => (
                <CartItemComponent key={item.id} item={item} onRemove={handleRemove}/>
            ))}
            <Row className="my-3 align-items-center">
                <Col xs={2}>
                    <div className="text-right mt-3">Всего: {totalPrice}₽</div>
                </Col>
                <Col>
                </Col>
                <Col xs={2}>
                    <Button onClick={() => navigate("/checkout")}>Оформить заказ</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;