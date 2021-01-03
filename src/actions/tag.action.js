import axios from "../helpers/axios";
import { categoryConstansts, tagConstants } from "./constants";

// const getAllCategory = () => {
//     return async dispatch => {

//         dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
//         const res = await axios.get(`category/getcategory`);
//         console.log(res);
//         if (res.status === 200) {

//             const { categoryList } = res.data;

//             dispatch({
//                 type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
//                 payload: { categories: categoryList }
//             });
//         } else {
//             dispatch({
//                 type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
//                 payload: { error: res.data.error }
//             });
//         }


//     }
// }

export const addTag = (form) => {
    return async dispatch => {
        dispatch({ type: tagConstants.CREATE_TAG_REQUEST });
        try {
            const res = await axios.post(`/tag/create`, form);
            if (res.status === 201) {
                dispatch({
                    type: tagConstants.CREATE_TAG_SUCCESS,
                    payload: { tag: res.data.tag }
                });
            } else {
                dispatch({
                    type: tagConstants.CREATE_TAG_FAILURE,
                    payload: res.data.error
                });
            }
        } catch (error) {   
            console.log(error.response);
        }

    }
}

// export const updateCategories = (form) => {
//     return async dispatch => {
//         dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_REQUEST });
//         const res = await axios.post(`/category/update`, form);
//         if (res.status === 201) {
//             dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_SUCCESS });
//             dispatch(getAllCategory());
//         } else {
//             const { error } = res.data;
//             dispatch({
//                 type: categoryConstansts.UPDATE_CATEGORIES_FAILURE,
//                 payload: { error }
//             });
//         }
//     }
// }

// export const deleteCategories = (ids) => {
//     return async dispatch => {
//         dispatch({ type: categoryConstansts.DELETE_CATEGORIES_REQUEST });
//         const res = await axios.post(`/category/delete`, {
//             payload: {
//                 ids
//             }
//         });
//         if (res.status == 201) {
//             dispatch(getAllCategory());
//             dispatch({ type: categoryConstansts.DELETE_CATEGORIES_SUCCESS });
//         } else {
//             const { error } = res.data;
//             dispatch({
//                 type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
//                 payload: { error }
//             });
//         }
//     }
// }

// export {
//     getAllCategory
// }