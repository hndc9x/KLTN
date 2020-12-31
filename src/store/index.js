import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../redux/reducers/rootReducer";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";

const store = createStore(
    rootReducer,
    load(),
    composeWithDevTools(applyMiddleware(thunk, save()))
  );
export default store;