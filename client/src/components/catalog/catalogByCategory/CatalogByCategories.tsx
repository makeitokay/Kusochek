import React from 'react';
import {Category} from "../../../types/category";
import CategoryShopCards from "./categoryShopCards";

interface CatalogByCategoriesProps {
    [name: string]: any
}

const CatalogByCategories = ({...props}: CatalogByCategoriesProps) => {
    return (
        <div {...props}>
            {/*<CategoryShopCards key={"Women"} category={Category["Women"]}*/}
            {/*                          nameCategory={"Women"}/>*/}
            {Object.keys(Category).map(key => {
                return <CategoryShopCards key={key} category={Category[key as keyof typeof Category]}
                                          nameCategory={key.toString()}/>
            })}
        </div>
    );
};

export default CatalogByCategories;