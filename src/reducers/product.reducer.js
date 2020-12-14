import { productConstansts } from "../actions/constants"

const initState = {
    product :[],
    productsByPrice:{
        under5k:[],
        under10k:[],
        under15k:[],
        under20k:[],
        under30k:[]
    }
}

export default (state = initState,action) => {
    switch(action.type){
        case productConstansts.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products : action.payload.product,
                productsByPrice:{
                    ...action.payload.productsByPrice
                }
            }
            break;
    }
    return state;
}