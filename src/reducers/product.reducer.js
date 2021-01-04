import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }

  return state;
};
