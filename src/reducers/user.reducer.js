import { userContants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userContants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userContants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userContants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userContants.GET_ALL_USER_SUCCESS:
      state = {
        ...state,
        user : action.payload.user,
        loading: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }

  return state;
};
