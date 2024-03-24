import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";

export async function getStoriesRequest() {
    const response = await  $host.get("/stories")
    return response.data
}
