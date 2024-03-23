import React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { CartItem } from '../../types/cartItemComponent';

interface CartItemComponentProps {
    item: CartItem;
    onRemove: (id: number) => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({ item, onRemove }) => {
    return (
        <Row className="my-3 align-items-center">
            <Col xs={2}><Image src={item.imageUrl} thumbnail fluid /></Col>
            <Col>
                <div>{item.name}</div>
                <div className="text-muted">Кол-во: {item.quantityInCart}</div>
                <div>{item.price}₽</div>
            </Col>
            <Col xs={2}>
                <Button variant="outline-danger" onClick={() => onRemove(item.id)}>Удалить</Button>
            </Col>
        </Row>
    );
};

export default CartItemComponent;