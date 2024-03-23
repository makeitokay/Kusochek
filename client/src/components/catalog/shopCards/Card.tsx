import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ItemCard} from "../../../types/ItemCard";
import {Col, Row} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import "../../../styles/CardPageStyles.css"
import InfoAboutProduct from "./InfoAboutProduct";
import Recommendation from "../Recommendation";
import "../../../styles/ButtonStyle.css"
import {useMediaQuery} from "react-responsive";
import {getItemInfoRequest} from "../../../HTTPRequests/store/getItemInfoRequest";
import {toast} from "react-toastify";
import RatingCarousel from "./RatingCarousel";
import {Rating} from "semantic-ui-react";
import {addItemCartRequest} from "../../../HTTPRequests/cart/addItemCartRequest";

const Card = () => {
    var windowWidth = window.innerWidth;
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isFullScreen = useMediaQuery({query: '(min-width: 1643px)'})
    const isHalfScreen = useMediaQuery({query: '(min-width: 800px)'})
    const isSmallWindowComputer = useMediaQuery({query: '(min-width: 992px)'})
    const notifyError = (message: string) => toast.error(message);
    const notifySuccess = (message: string) => toast.success(message);
    const [mainImage, setMainImage] = useState<string>("https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F78%2Fba%2F78ba18ad82ffc28bb283f42a01c3f84af15adfd8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D")
    const {id} = useParams<string>()
    const [product, setProduct] = useState<ItemCard>()
    useEffect(() => {
        if (id !== undefined) {
            getItemInfoRequest(id)
                .then((data) => {
                    setProduct(data)
                    console.log(data)
                    console.log(data.averageMark)
                })
                .catch(() => notifyError("Товар не получен"))
        }
    }, [id]);

    function chooseImage(e: any) {
        console.log(e.target.parentNode)
        for (let i of e.target.parentNode.parentNode.children) {
            i.classList.remove("focus")
        }
        e.target.parentNode.classList.add("focus")
        setMainImage(e.target.src)
    }

    function addItemCart() {
        if (id !== undefined) {
            addItemCartRequest(id).then(()=>notifySuccess("Товар добавлен")).catch(()=> notifyError("Не удалось добавить товар"))
        }
    }

    return (
        <>
            <Row>
                <Col style={{
                    display: "flex", maxHeight: `${
                        isFullScreen ? "80vh" :
                            isDesktopOrLaptop ? "60vh" :
                                isSmallWindowComputer ? "50vh"
                                    : isHalfScreen ? "40vh" : "40vh"}`
                }}>
                    <div style={{maxWidth: "75%"}}>
                        <Image
                            src={mainImage}></Image>
                    </div>
                    <div style={{width: "25%"}} className="columnPhotos">
                        <div>
                            <div className="extraImage" onClick={(e) => chooseImage(e)}>
                                <Image
                                    src="https://image.hm.com/assets/hm/83/e9/83e9fd280f18eb8d687ee3a66cd9b146103cd5ff.jpg"/>
                            </div>
                            <div className="extraImage" onClick={(e) => chooseImage(e)}>
                                <Image
                                    src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F78%2Fba%2F78ba18ad82ffc28bb283f42a01c3f84af15adfd8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D"/>
                            </div>
                            <div className="extraImage" onClick={(e) => chooseImage(e)}>
                                <Image
                                    src="https://image.hm.com/assets/hm/c6/b4/c6b4d03e0b105c77ef2cd4330ac46a4267c7ce55.jpg"/>
                            </div>
                            <div className="extraImage" onClick={(e) => chooseImage(e)}>
                                <Image
                                    src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F78%2Fba%2F78ba18ad82ffc28bb283f42a01c3f84af15adfd8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D"/>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <h2>{product?.name}</h2>
                    {product ? <Rating defaultRating={product.averageMark} maxRating={5}/> : <></>}
                    <div style={{background: "#f4f4f4", padding: "24px", marginTop: "3vh"}}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div>
                                <div style={{
                                    fontSize: "14px",
                                    lineHeight: "20px"
                                }}>
                                    Стоимость продукта
                                </div>
                                <div style={{
                                    fontSize: "24px",
                                    lineHeight: "34px"
                                }}>
                                    {product?.price + " рублей"}
                                </div>
                            </div>
                            <div className="containerSpecialButton" onClick={addItemCart}>
                                <div className="bottom"></div>
                                <div className="cover cut"></div>
                                <div className="text-container">
                                    <div className="text text-dark">Купить</div>
                                </div>
                                <div className="text-container cut">
                                    <div className="text">Купить</div>
                                </div>
                                <div className="overlay"></div>
                            </div>
                            {/*<Button style={{width: "224px", background: "black", border: "1px solid black"}}>Добавить в*/}
                            {/*    корзину</Button>*/}
                        </div>
                    </div>
                    <div style={{marginTop: "5vh"}}>
                        <InfoAboutProduct description={product?.description}
                                          className="info"/>
                    </div>
                    <div style={{marginTop: "5vh"}}>
                        <RatingCarousel reviews={product?.reviews}/>
                    </div>
                </Col>
            </Row>
            <div style={{marginTop: "15vh"}}>
                <Recommendation/>
            </div>
        </>
    );
};


export default Card;