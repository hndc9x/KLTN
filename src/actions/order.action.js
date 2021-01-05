import axios from "../helpers/axios";
import { orderConstants } from "./constants";

const getOrder = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/getOrder`);
      if (res.status === 200) {
        const orders  = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrder = (form) => {
  return async dispatch => {
      const res = await axios.post(`/updateOrder`, form);
      if (res.status === 201) {
        dispatch(getOrder());
      } else {
          const { error } = res.data;
          alert(error);
      }
  }
}
