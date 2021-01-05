import { orderConstants } from "../actions/constants";

const initState = {
  order : null
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_USER_ORDER_REQUEST:
      state = {
        ...state
      };
      break;
    case orderConstants.GET_USER_ORDER_SUCCESS:
      state = {
        ...state,
        order: action.payload.order,
      };
      break;
    case orderConstants.GET_USER_ORDER_FAILURE:
      state = {
        ...initState,
      };
      break;
      default : 
      state = {
        ...state,
      };
      break;
  }

  return state;
};
