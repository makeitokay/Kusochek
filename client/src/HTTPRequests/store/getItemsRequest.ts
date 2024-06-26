import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";
import {Filter} from "../../types/filter";

export async function getAllItemsRequest(params?: Filter, id?: number[], category?: string[]) {
    let response
    if (id) {
        response = await $host.get(`/products`, {params: id})
    } else {
        response = await $host.get(`/products`, {params: {...params, categories: (category || "").toString()}})
    }
    return response.data
}
