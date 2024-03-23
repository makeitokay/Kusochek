import {$authHost} from "../index";
import {getCartRequest} from "../cart/getCartRequest";

interface IOrderFormData {
    firstName: string;
    lastName: string;
    deliveryAddress: string;
    phoneNumber: number;
    deliveryDate: string;
    paymentMethod: 'card' | 'cash';
}

export async function addOrderRequest(data: IOrderFormData) {
    const array = await getCartRequest().then(data => {
        let array = []
        for (let i of data.products) {
            array.push({id: i.id, quantity: i.quantityInCart})
        }
        return array
    })
    const response = await $authHost.post(`/orders`, {
        productItems: array,
        name: data.firstName,
        lastName: data.lastName,
        phone: data.phoneNumber,
        deliveryAddress: data.deliveryAddress,
        deliveryDate: data.deliveryDate
    })
    return response.data
}
