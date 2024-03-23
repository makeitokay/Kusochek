import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";

export async function infoUserRequest() {
    const response = await  $authHost.get("/profile")
    return response.data
}