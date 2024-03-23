import React from 'react';
import {Outlet} from 'react-router-dom'
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/layoutStyles.css"
import Notification from "./Notification";

const Layout = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh"
        }}>
            <header>
                <NavBar/>
            </header>
            <main style={{padding: "3%", paddingBottom: "13%", paddingLeft:"10%",paddingRight:"10%", flexGrow: 1}}>
                <Outlet/>
                <Notification/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;