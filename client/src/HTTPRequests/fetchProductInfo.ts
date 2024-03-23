import axios from 'axios';

interface fetchListProductsByCategoryProps {
    id: string
}

export async function fetchListProductsByCategory(id: fetchListProductsByCategoryProps) {
    const axios1 = axios({
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail',
        params: {
            lang: 'en',
            country: 'us',
            productcode: id
        },
        headers: {
            'X-RapidAPI-Key': '4050a2ee3bmsh2999ae57044c936p182df1jsne1df8c996b88',
            'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
    })
    const response = await axios1
    return response.data
}