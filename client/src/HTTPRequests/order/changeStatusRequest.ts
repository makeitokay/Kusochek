import {$authHost} from "../index";

export async function changeStatusRequest(productId: number, status: string) {
    const response = await $authHost.post(`/orders/${productId}`, {status: status})
}
