import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";

export async function addProductRequest(data: any) {
    const response = await  $authHost.post("/products",data)
}
