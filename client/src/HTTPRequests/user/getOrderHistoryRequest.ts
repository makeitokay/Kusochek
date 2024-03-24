import {$authHost} from "../index";

export async function getOrderHistoryRequest() {
    const response = await $authHost.get("/orders")
    return response.data
}