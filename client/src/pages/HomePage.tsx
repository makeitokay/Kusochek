import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {selectUser} from "../store/slices/user"
import "../styles/storyStyle.css"
import Stories from "../components/stories/Stories";
import CatalogByCategories from "../components/catalog/catalogByCategory/CatalogByCategories";

const HomePage = () => {
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    useEffect(() => {
        // dispatch(fetchUser(2))
    }, [])
    //
    // if (error) {
    //     return <div>{error}</div>
    // }
    // if (loading) {
    //     return <div>Идет загрузка</div>
    // }

    console.log("home")
    return (
        <div>
            <Stories/>
            <CatalogByCategories style={{marginTop:"5%"}}/>
        </div>
    );
};

export default HomePage;