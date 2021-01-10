import {
  categoryConstansts,
  productConstants,
  orderConstants,
  userContants
} from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`/initialData`);
    if (res.status === 200) {
      const { categories, products, orders , user } = res.data;
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
      dispatch({
        type: userContants.GET_ALL_USER_SUCCESS,
        payload: { user },
      });
    }
    console.log(res);
  };
};
