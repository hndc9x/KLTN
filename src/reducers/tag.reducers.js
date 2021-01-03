import { tagConstants } from "../actions/constants";
import { categoryConstansts } from "../actions/constants"

const initState = {
    tags: [],
    loading : false,
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case tagConstants.CREATE_TAG_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case tagConstants.CREATE_TAG_SUCCESS:
            state = {
                ...state,
                tags: action.payload.tag,
                loading: false,
            }
            break;
        case tagConstants.CREATE_TAG_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case categoryConstansts.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstansts.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstansts.DELETE_CATEGORIES_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
            default : state = {...state}
            break;
    }

    return state;
}