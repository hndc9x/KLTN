import { orderConstants } from "./constants";
import axios from "../../helpers/axios";





export const getOrderLoading = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/getOrder`);
      if (res.status === 200) {
        const order  = res.data;
        dispatch({
          type: orderConstants.GET_USER_ORDER_SUCCESS,
          payload: { order },
        });
      } else {
        dispatch({ type: orderConstants.GET_USER_ORDER_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


const getOrder = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/getOrder`);
      if (res.status === 200) {
        const order  = res.data;
        dispatch({
          type: orderConstants.GET_USER_ORDER_SUCCESS,
          payload: { order },
        });
      } else {
        dispatch({ type: orderConstants.GET_USER_ORDER_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (form) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: orderConstants.GET_USER_ORDER_REQUEST });
      res = await axios.post(`/addOrder`, form);
      if (res.status === 201) {
      //  // dispatch({ type: orderConstants.SIGNUP_SUCCESS });
      //   //const { token, user } = res.data;
      //   const order = res.data;
      //   console.log(order);
      //   dispatch({
      //     type: orderConstants.GET_USER_ORDER_SUCCESS,
      //     payload: {
      //       order
      //     },
      //   });
        dispatch(getOrder());
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
