import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RedirectToShopItem = () => {
    let { id, id2 } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        console.log(id, id2)
        if (id2){
            navigate(`/shop/items/${id2}`, { replace: true });
        } else{
            navigate(`/shop/items/${id}`, { replace: true });
        }
    }, [id,id2, navigate]);

    return null;
};

export default RedirectToShopItem;