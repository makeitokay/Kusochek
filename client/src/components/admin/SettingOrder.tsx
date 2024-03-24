import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getOrderAllHistoryRequest} from "../../HTTPRequests/user/getOrderHistoryRequest";
import {Container, Table} from "react-bootstrap";
import {Dropdown} from "semantic-ui-react";
import {orderStatus} from "../../types/orderStatus";
import {changeStatusRequest} from "../../HTTPRequests/order/changeStatusRequest";

interface Product {
    id: string
    name: string;
}

interface Order {
    id: number,
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

const SettingOrder = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [statuses, setStatuses] = useState<{
        key: string;
        text: string;
        value: string;
    }[]>([])
    const [currentStatuses, setCurrentStatuses] = useState<string[]>([])
    const notifyError = (message: string) => toast.error(message);
    const notifySuccess = (message: string) => toast.success(message);
    useEffect(() => {
        getOrderAllHistoryRequest().then((data) => {
            setOrders(data)
            let array = []
            for (let i of data) {
                array.push(i.status)
            }
            setCurrentStatuses(array)
        }).catch(() => notifyError("Не удалось получить историю"))
        setStatuses(Object.keys(orderStatus).map((status) => {
            return {key: status, text: orderStatus[status as keyof typeof orderStatus], value: status}
        }))
    }, [])
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

    const changeStatus = (value: string, index: number) => {
        let array = []
        for (let i = 0; i < currentStatuses.length; i++) {
            if (i === index) {
                array.push(value)
                changeStatusRequest(orders[i].id, value).then(() => notifySuccess("Статус изменен")).catch(() => notifyError("Статус не удалось изменить"))
            } else {
                array.push(currentStatuses[i])
            }
        }
        setCurrentStatuses(array)
    }
    useEffect(() => {
        setStatuses(Object.keys(orderStatus).map((status) => {
            return {key: status, text: orderStatus[status as keyof typeof orderStatus], value: status}
        }))
    }, []);
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
                        <td><Dropdown className="dropdown_custom"
                                      placeholder='Категория'
                                      fluid
                                      search
                                      selection
                                      options={statuses}
                                      value={currentStatuses[index]}
                                      onChange={(_, data) =>
                                          changeStatus(data.value as string, index)}
                        /></td>
                        <td>{formatUTCString(order.creationDateTimeUtc)}</td>
                        <td>${order.cost.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default SettingOrder;