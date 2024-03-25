import React, {useEffect, useState} from 'react';
import * as VKID from '@vkid/sdk';
import {Form, Button, Container, Nav} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {vkLoginRequest} from "../HTTPRequests/verificationFunctions/LoginRequest";
import {setUser} from "../store/slices/user";
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {selectAppError, selectAppLoading, setLoading} from "../store/slices/appState";
import {infoUserRequest} from "../HTTPRequests/user/infoUserRequest";
import {toast} from "react-toastify";
import '../styles/VkButtonStyle.css';
import { Navigate } from 'react-router-dom';

interface VkAuthPayload {
    uuid: string,
    token: string
}

const VkAuthSuccessPage: React.FC = () => {
    const dispatch = useAppDispatch()
    let navigate = useNavigate();

    const notifyError = () => toast.error('Не удалось войти через ВК');
    const [payload, setPayload] = useState<VkAuthPayload>({uuid:'',token:''})

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const payloadParam = urlParams.get('payload');
        
        if (payloadParam) {
            try {
                const payload = JSON.parse(decodeURIComponent(payloadParam));
                console.log(payload)
                setPayload({...payload,uuid:payload.uuid,token:payload.token});
                vkLogin(payload);
                
            } catch (error) {
                notifyError();
                navigate("/login");
            }
        } else {
            notifyError();
            navigate("/login");
        }
    }, []);
    
    
    function vkLogin(vkPayload: VkAuthPayload) {
        dispatch(setLoading(true))
        const userPromise = vkLoginRequest({uuid: vkPayload.uuid, token: vkPayload.token})
        userPromise.then(() => {
                return infoUserRequest()
            }
        ).then((user => {
            dispatch(setUser(user))
            dispatch(setLoading(false))
            localStorage.setItem("isAuth", "true")
            navigate("/")
        })).catch((e) => {
            notifyError()
            console.log(e + "hh")
        })
    }
    
    return (<div></div>)
};

export default VkAuthSuccessPage;
