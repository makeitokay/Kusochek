import React from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "../store/slices/user";

const RequireAuth = () => {
    const user = useSelector(selectUser)

    return (
        <div>

        </div>
    );
};

export default RequireAuth;