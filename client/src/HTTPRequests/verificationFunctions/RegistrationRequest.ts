import {$host} from "../index";

interface RegistrationRequestProps {
    email: string,
    firstName: string,
    lastName: string,
    mobilePhone: string,
    password: string
}

export async function RegistrationRequest({email, firstName, lastName, mobilePhone, password}: RegistrationRequestProps) {
    const response = await $host.post("/auth/signup", {email, firstName, lastName, mobilePhone, password})
}