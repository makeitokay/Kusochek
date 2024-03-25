import {$authHost, $host, $host2} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";



export async function getStoriesRequest() {
    const response = await  $host2.get("/stories")
    return response.data
}
