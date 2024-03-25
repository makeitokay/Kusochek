import React, {useEffect, useState} from 'react';
import {Product, ProductCard} from "../../../types/product";
import {fetchListProductsByCategory} from "../../../HTTPRequests/fetchListProductsByCategory";
import ShopCard from "../shopCards/ShopCard";
import "../../../styles/caruselStyle.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../../styles/CardPageStyles.css"
import CustomLink from "../../CustomLink";
import {getAllItemsRequest} from "../../../HTTPRequests/store/getItemsRequest";
import {toast} from "react-toastify";
interface CategoryShopCardsProps {
    category: string,
    nameCategory: string
}

const CategoryShopCards = ({category, nameCategory}: CategoryShopCardsProps) => {
    const [items, setItems] = useState<ProductCard[]>([])
    const params = new URLSearchParams();
    const notifyError = (message: string) => toast.error(message);
    params.append('categories', nameCategory);
    useEffect(() => {
        getAllItemsRequest(undefined, undefined, [nameCategory]).then((data)=> setItems(data)).catch(()=>notifyError("Не удалось получить товары по категории"))
        // fetchListProductsByCategory({category}).then(data => {
        //         let array: Product[] = []
        //         for (let item of data.results) {
        //             array.push({
        //                 name: item.name,
        //                 image: item.images[0].url,
        //                 price: item.price.formattedValue,
        //                 id: item.allArticleCodes[0]
        //             })
        //         }
        //         setItems(array)
        //     }
        // )
    }, []);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 4
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 2
        }
    };
    if (items.length === 0) {
        return <></>
    }
    return (
        <div style={{paddingBottom: "10vh"}}>
            <CustomLink to={`/shop?${params.toString()}`} style={{border:0, margin:"1rem",color:"black"}}>
                <h2>{category}</h2>
            </CustomLink>
            <Carousel responsive={responsive}>
                {items.map(obj => (<ShopCard route ={`items/${obj.id}`} className="catalogCard" item={obj}/>))}
            </Carousel>
        </div>
    );
};

export default CategoryShopCards;
