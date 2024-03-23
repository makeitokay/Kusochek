import React from 'react';
import {Link} from "react-router-dom";

interface CustomLinkProps {
    children?: React.ReactNode;
    to: string;
    [name: string]: any
}

const CustomLink = ({children, to, ...props}: CustomLinkProps) => {
    return (
        <Link to={to} {...props}>
            {children}
        </Link>
    );
};

export default CustomLink;