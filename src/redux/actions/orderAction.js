import { orderConstants } from "./constants";
import axios from "../../helpers/axios";

export const addOrder = (form) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: orderConstants.GET_USER_ORDER_REQUEST });
      res = await axios.post(`/addOrder`, form);
      if (res.status === 201) {
       // dispatch({ type: orderConstants.SIGNUP_SUCCESS });
        //const { token, user } = res.data;
        const order = res.data;
        console.log(order);
        dispatch({
          type: orderConstants.GET_USER_ORDER_SUCCESS,
          payload: {
            order
          },
        });
      } else {
        const { error } = res.data;
        dispatch({ type: orderConstants.GET_USER_ORDER_FAILURE, payload: { error } });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: orderConstants.GET_USER_ORDER_FAILURE,
        payload: { error: data.error },
      });
    }
  };
};
