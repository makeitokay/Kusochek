import React from 'react';
import Carousel from "react-multi-carousel";
import ShopCard from "./shopCards/ShopCard";
import {Product} from "../../types/product";

const Recommendation = () => {
    const items: Product[] = [
        {
            name: "first",
            image: "https://lp2.hm.com/hmgoepprod?set=source[/21/ba/21babcbfd1d5d2fd7a138879c20bbc9768b9b8f1.jpg],origin[dam],category[home_cushions_innercushions],type[DESCRIPTIVESTILLLIFE],res[x],hmver[2]&call=url[file:/product/style]",
            price: "5000",
            id: 1
        },
        {
            name: "second",
            image: "https://lp2.hm.com/hmgoepprod?set=source[/f3/91/f391a9ebf237fe53a50091f379ccc35a1ab7dc1c.jpg],origin[dam],category[home_storage_all],type[DESCRIPTIVESTILLLIFE],res[x],hmver[2]&call=url[file:/product/style]",
            price: "5344",
            id: 2
        },
        {
            name: "thr",
            image: "https://lp2.hm.com/hmgoepprod?set=source[/3f/42/3f425d2fa5641d6fba46ecb43f11e654d6134b4e.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[x],hmver[3]&call=url[file:/product/style]",
            price: "52234",
            id: 3
        },
        {
            name: "fr",
            image: "https://lp2.hm.com/hmgoepprod?set=source[/a6/21/a621ccbfd39038bc4c2f3fc8439861f3b5ddeb42.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[x],hmver[2]&call=url[file:/product/style]",
            price: "5123",
            id: 4
        },
        {
            name: "tort",
            image: "https://lp2.hm.com/hmgoepprod?set=source[/22/ca/22ca234a1ae241019dfeb5a98c1bc06d275cedac.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[x],hmver[4]&call=url[file:/product/style]",
            price: "5123",
            id: 5
        },
        {
            name: "cake",
            image: "https://lp2.hm.com/hmgoepprod?set=source[/1c/d7/1cd74d62badd4729dd262c7bc4f781b17cdb87bf.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[x],hmver[2]&call=url[file:/product/style]",
            price: "5432",
            id: 6
        },
    ]
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 7
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 5
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 3
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 2
        }
    };

    return (
        <>
            <h2 style={{marginBottom: "2vh"}}>Вам понравится</h2>
            {/*<Carousel responsive={responsive}>*/}
            {/*    {items.map(obj => (*/}
            {/*        <ShopCard item={obj} classNameImg={"img-wrapper small"} route={`${obj.id}`}/>*/}
            {/*        // <button style={{border:0, padding:0}}>*/}
            {/*        //     <ShopCard item={obj} route={`${obj.id}`} classNameImg={"img-wrapper small"}/>*/}
            {/*        // </button>*/}
            {/*    ))}*/}
            {/*</Carousel>*/}
        </>
    );
};

export default Recommendation;
