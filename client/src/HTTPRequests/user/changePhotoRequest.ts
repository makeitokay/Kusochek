import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";

export async function changePhotoRequest(photo: any) {
    const response = await  $authHost.post("/profile/uploadPicture",photo)
}
