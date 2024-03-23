import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {selectUser, setUser} from "../../store/slices/user";
import {deepEqual} from "../../functions/CompareObjects";
import {infoUserRequest} from "../../HTTPRequests/user/infoUserRequest";
import {setLoading} from "../../store/slices/appState";
import {toast} from "react-toastify";

type RequireAuthProps = {
    children: JSX.Element;
};

export const RequireAuth: React.FC<RequireAuthProps> = ({children}) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    let isAuthenticated = isAuth(user);
    let location = useLocation();
    const notifyError = () => toast.error('ошибка');

    function isAuth(user: any) {
        if (localStorage.getItem("isAuth") === "true" && localStorage.getItem("token")) {
            if (deepEqual(user, {
                firstName: "",
                lastName: "",
                email: "",
                phone: 0,
                profilePicture: "",
                isAdmin: false
            })) {
                infoUserRequest().then((user => {
                    dispatch(setUser(user))
                    dispatch(setLoading(false))
                    localStorage.setItem("isAuth", "true")
                    return true
                })).catch((e) => {
                    notifyError()
                    console.log(e + "hh")
                })
            } else {
                return true
            }
        } else {
            return false
        }
    }
    if (!isAuthenticated) {
        // Перенаправить на страницу входа, сохранив текущий путь в состоянии location
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
};
