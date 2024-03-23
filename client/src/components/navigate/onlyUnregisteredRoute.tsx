import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {deepEqual} from "../../functions/CompareObjects";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {selectUser, setUser} from "../../store/slices/user";
import {infoUserRequest} from "../../HTTPRequests/user/infoUserRequest";
import {setLoading} from "../../store/slices/appState";
import {toast} from "react-toastify";

type OnlyUnregisteredRouteProps = {
    children: JSX.Element;
};
const OnlyUnregisteredRoute: React.FC<OnlyUnregisteredRouteProps> = ({children}) => {
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

    if (isAuthenticated) {
        return <Navigate to="/" state={{from: location}} replace/>;
    }
    return children;
};

export default OnlyUnregisteredRoute;
