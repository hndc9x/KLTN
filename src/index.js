import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import products from "./data/products.json";
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";
import store from './store';
import axios from "./helpers/axios";

window.store = store;


axios.post(`/product/getProducts`).then((response) => {
  store.dispatch(fetchProducts(response.data));
  console.log(response.data);
},(error) => {
  console.log(error);
});

// fetch products from json file
//store.dispatch(fetchProducts(products));



ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
