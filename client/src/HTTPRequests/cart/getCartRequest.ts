import {$authHost} from "../index";

export async function getCartRequest() {
    const response = await $authHost.get(`/cart`)
    return response.data
}
