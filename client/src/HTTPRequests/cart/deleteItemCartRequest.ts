import {$authHost} from "../index";

export async function deleteItemCartRequest(productId: number) {
    const response = await $authHost.delete(`/cart/${productId}`)
}
