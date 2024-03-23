import React, {useEffect, useState} from 'react';
import {fetchListProductsByCategory} from "../../../HTTPRequests/fetchListProductsByCategory";
import {ProductCard} from "../../../types/product";
import {Col, Row} from "react-bootstrap";
import ShopCard from "../shopCards/ShopCard";
import Filter from "./Filter";
import "../../../styles/CardShopStyle.css"
import {getAllItemsRequest} from "../../../HTTPRequests/store/getItemsRequest";

const FilterableCatalog = () => {
    const [products, setProducts] = useState<ProductCard[]>([])
    function change(array:any){
        setProducts(array)
    }
    useEffect(() => {
        getAllItemsRequest().then(array => {
            const tempArray = array.map((elem: ProductCard) => elem)
            setProducts(tempArray)
        })
        // fetchListProductsByCategory({count: 30}).then(data => {
        //         let array: Product[] = []
        //         for (let item of data.results) {
        //             array.push({
        //                 name: item.name,
        //                 image: item.images[0].url,
        //                 price: item.price.formattedValue,
        //                 id: item.allArticleCodes[0]
        //             })
        //         }
        //         setProducts(array)
        //     }
        // )
    }, []);

    if (products.length === 0) {
        return <Filter changeArray={change}/>
    }
    return (
        <>
            <Filter changeArray={change}/>
            <div style={{marginTop:"1rem"}}>
                <Row xs={2} md={2} lg={5}>
                    {products.map(product => (
                        <Col className="d-flex mb-4">
                            <ShopCard className="catalogCard" route={`items/${product.id}`} item={product}/>
                        </Col>
                    ))}
                </Row>
            </div>
        </>

    );
};

export default FilterableCatalog;
