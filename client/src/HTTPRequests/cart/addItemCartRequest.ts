import {$authHost} from "../index";

export async function addItemCartRequest(productId: string) {
    const response = await $authHost.post(`/cart/${productId}`)
}
