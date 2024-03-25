import axios from "axios";
import {$host} from "../index";
import jwt_decode, {jwtDecode} from "jwt-decode"
import {User} from "../../types/user";

interface loginProps {
    email: string,
    password: string
}

interface vkLoginProps {
    uuid: string,
    token: string
}

export async function loginRequest({email, password}: loginProps) {
    const response = await $host.post("/auth/login", {email, password})
    localStorage.setItem("token", response.data.accessToken)
    return jwtDecode<User>(response.data.accessToken)
}

export async function vkLoginRequest({uuid, token}: vkLoginProps) {
    const response = await $host.post("/auth/vk", {uuid, token})
    localStorage.setItem("token", response.data.accessToken)
    return jwtDecode<User>(response.data.accessToken)
}