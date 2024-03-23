import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";

export async function changePasswordRequest(password: any) {
    const response = await  $authHost.post("/profile/changePassword",{newPassword: password})
}
