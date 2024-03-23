import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";

export async function addPromotionRequest(data: any) {
    const response = await $authHost.post(`/stories`, data)
    return response.data
}
