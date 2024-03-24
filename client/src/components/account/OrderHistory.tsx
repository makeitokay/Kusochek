import React, {useEffect, useState} from 'react';
import {Table, Container, Modal, Button} from 'react-bootstrap';
import {getOrderHistoryRequest} from "../../HTTPRequests/user/getOrderHistoryRequest";
import {toast} from "react-toastify";
import {getAllItemsRequest} from "../../HTTPRequests/store/getItemsRequest";
import dark = toast.dark;

interface Product {
    id: string
    name: string;
}

interface Order {
    productItems: Product[];
    name: string;
    lastName: string;
    phone: string;
    deliveryAddress: string;
    deliveryDate: string;
    status: string;
    creationDateTimeUtc: string;
    cost: number;
}

const OrderHistory = () => {
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [orders, setOrders] = useState<Order[]>([])
    const notifyError = (message: string) => toast.error(message);
    const notifySuccess = (message: string) => toast.success(message);
    useEffect(() => {
        getOrderHistoryRequest().then((data) => setOrders(data)).catch(() => notifyError("Не удалось получить историю"))
    }, [])
    const handleClose = () => setShowModal(false);
    const handleShow = (order: Order) => {
        const id = order.productItems.map((product) => Number(product.id))
        getAllItemsRequest(undefined, id).then((data) => {
            setSelectedProducts(data)
        })
        setShowModal(true);
    };

    function formatUTCString(utcString: string): string {
        const date = new Date(utcString);

        // Предположим, что мы хотим получить формат даты в виде ДД.ММ.ГГГГ, чч:мм (например, "01.01.2023, 15:00").
        // 'en-US' локаль используется просто как пример, вы можете заменить на нужную.
        return date.toLocaleDateString('rus-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    return (
        <Container style={{maxHeight: '400px', overflowY: 'auto'}}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>Адрес</th>
                    <th>Дата доставки</th>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Цена</th>
                    <th>Детали</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.name}</td>
                        <td>{order.lastName}</td>
                        <td>{order.phone}</td>
                        <td>{order.deliveryAddress}</td>
                        <td>{formatUTCString(order.deliveryDate)}</td>
                        <td>{order.status}</td>
                        <td>{formatUTCString(order.creationDateTimeUtc)}</td>
                        <td>${order.cost.toFixed(2)}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleShow(order)}>View Products</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {selectedProducts && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Products</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedProducts.map((product, index) => (
                            <>
                                <div key={index}>{product.name}</div>
                            </>

                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default OrderHistory;
