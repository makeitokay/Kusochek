import React from 'react';
import {Card} from "react-bootstrap";
import {ProductCard} from "../../../types/product";
import "../../../styles/caruselStyle.css"
import CustomLink from "../../CustomLink";

interface ShopCardProps {
    item: ProductCard,
    className?: string,
    classNameImg?: string,
    route?: string,
    [name: string]: any
}

const ShopCard = ({item, className, classNameImg, route, ...props}: ShopCardProps) => {
    return (
        <CustomLink to={route||""}  style={{textDecoration:"none"}}>
            <Card className={className} {...props}>
                <div className={classNameImg}>
                    <Card.Img src={item.image}/>
                </div>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        {item.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </CustomLink>
    );
};

export default ShopCard;
