import {$authHost, $host} from "../index";
import {jwtDecode} from "jwt-decode";
import {User} from "../../types/user";

export async function addStoryRequest(data: any) {
    const response = await $authHost.post(`/stories`, data)
    return response.data
}
export async function addVideoStory(id:any, data:any){
    const response = await $authHost.post(`/stories/${id}`,data)
    return response.data
}
export async function activateStory(id:any){
    const response = await $authHost.post(`/stories/${id}/ready`)
    return response.data
}
