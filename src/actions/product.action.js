import axios from '../helpers/axios';
import { productConstansts } from './constants';

export const getProductsBySlug = (slug) =>{
    return async dispatch =>{
        const res = await axios.get(`/products/${slug}`);
        if(res.status === 200){
            dispatch({
                type:productConstansts.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        }else{
            // dispatch({

            // })
        }
    }
}