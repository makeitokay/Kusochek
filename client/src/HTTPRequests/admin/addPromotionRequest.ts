import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";

export async function addPromotionRequest(data: any) {
    const response = await $authHost.post(`/promotions`, data)
    return response.data
}
