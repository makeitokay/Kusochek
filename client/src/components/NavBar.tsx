import React from 'react';
import {Container, Nav, Navbar as NavBarComponent} from "react-bootstrap";
import CustomLink from "./CustomLink";
import "../styles/NavBarStyle.css"
import {useMediaQuery} from "react-responsive";
import {useAppSelector} from "../hooks/storeHooks";
import {selectUser} from "../store/slices/user";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    let navigate = useNavigate();
    const user = useAppSelector(selectUser)
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 992px)'
    })
    return (
        <NavBarComponent
            bg="dark"
            data-bs-theme="dark"
            expand="lg"
            className="bg-body-tertiary nav_bar_custom">
            <Container>
                <NavBarComponent.Brand
                    href="#home"
                    className={`${isDesktopOrLaptop ? "position-absolute" : ""}`}>
                    KUSOCHEK
                </NavBarComponent.Brand>
                <NavBarComponent.Toggle/>
                <NavBarComponent.Collapse className="justify-content-center">
                    <Nav>
                        <CustomLink className="nav-link" to="/">Главная</CustomLink>
                        <CustomLink className="nav-link" to={"info"}>Инфо</CustomLink>
                        <CustomLink className="nav-link" to={"shop"}>Магазин</CustomLink>
                        {user.isAdmin ? <CustomLink className="nav-link" to={"admin_panel"}>Админ</CustomLink> :
                            <></>}
                    </Nav>
                </NavBarComponent.Collapse>
                <NavBarComponent.Collapse
                    className={`${isDesktopOrLaptop ? "position-absolute" : "justify-content-end"}`}
                    style={isDesktopOrLaptop ? {right: "10vw"} : {}}

                >
                    <ion-icon
                        onClick={() => navigate("/cart")}
                        style={{color: "white", cursor: "pointer"}}
                        size="large"
                        name="cart-outline"/>
                    {/*<Image*/}
                    {/*    style={{background: "black", height: "50px", width: "50px", objectFit: "cover"}}*/}
                    {/*    src="https://sneg.top/uploads/posts/2023-06/1687931407_sneg-top-p-prikolnie-avatarki-dlya-malchikov-vkontakt-5.jpg"*/}
                    {/*    roundedCircle*/}
                    {/*/>*/}
                    {/*{deepEqual(user, {id: 0, userName: null, email: null, role: null}) ?*/}
                    {/*    <CustomLink className="nav-link" to="login">*/}
                    {/*        Войти*/}
                    {/*    </CustomLink>*/}
                    {/*    :*/}
                    {/*    <Image*/}
                    {/*        style={{background: "black", height: "50px", width: "50px", objectFit: "cover"}}*/}
                    {/*        src="https://sneg.top/uploads/posts/2023-06/1687931407_sneg-top-p-prikolnie-avatarki-dlya-malchikov-vkontakt-5.jpg"*/}
                    {/*        roundedCircle*/}
                    {/*    />*/}
                    {/*}*/}
                </NavBarComponent.Collapse>
            </Container>
        </NavBarComponent>
    );
};

export default NavBar;