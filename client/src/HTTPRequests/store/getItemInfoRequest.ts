import {$host} from "../index";

export async function getItemInfoRequest(id: string) {
    const response = await $host.get(`/products/${id}`)
    return response.data
}
