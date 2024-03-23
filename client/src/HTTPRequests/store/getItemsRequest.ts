import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";
import {Filter} from "../../types/filter";

export async function getAllItemsRequest(params?: Filter) {
    const response = await $host.get(`/products`,  {params: {...params}})
    return response.data
}
