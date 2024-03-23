import React from 'react';
import "../styles/FooterStyle.css"
import CustomLink from "./CustomLink";
const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                </div>
                <ul className="social-icon">
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-vk"></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-linkedin"></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a></li>
                </ul>
                <ul className="menu">
                    <CustomLink className="menu__link" to="/">Главная</CustomLink>
                    <CustomLink className="menu__link" to="/">Contact</CustomLink>
                    {/*<li className="menu__item"><a className="menu__link" href="#">Contact</a></li>*/}
                </ul>
                <p>&copy;2023 Korolev Vasiliev | All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default Footer;