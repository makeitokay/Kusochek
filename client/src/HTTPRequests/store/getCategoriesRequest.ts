import {$host} from "../index";

export async function getCategoriesRequest() {
    const response = await $host.get(`products/categories`)
    return response.data
}
