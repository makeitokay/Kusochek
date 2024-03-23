import axios from "axios";

interface fetchListProductsByCategoryProps {
    category?: string,
    count?: number;
}

export async function fetchListProductsByCategory({category = "men_all", count = 10}: fetchListProductsByCategoryProps = {}) {
    const axios1 = axios({
        url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
        method: "get",
        params: {
            country: 'us',
            lang: 'en',
            currentpage: '0',
            pagesize: count,
            categories: category
        },
        headers: {
            'X-RapidAPI-Key': '4050a2ee3bmsh2999ae57044c936p182df1jsne1df8c996b88',
            'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
    })
    const response = await axios1
    return response.data
}