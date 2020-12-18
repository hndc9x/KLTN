import React, {  useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import PrivateRoute from "../src/components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, isUserLoggedIn } from "./actions";
import TheProduct from "./views/menu/Product";
import TheHome from "./views/dashboard/Dashboard";
import TheCategory from "./views/menu/Category";
import ThePage from "./views/menu/NewPage";
import TheOrder from "./views/menu/Order";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  //xac thuc tai khoan
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <React.Suspense fallback={loading}>
        <Switch>
          <PrivateRoute path="/" exact component={TheHome} />
          <PrivateRoute path="/category" component={TheCategory} />
          <PrivateRoute path="/products" component={TheProduct} />
          <PrivateRoute path="/orders" component={TheOrder} />
          <PrivateRoute path="/page" component={ThePage} />
          {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
        </Switch>
      </React.Suspense>
    </div>
  );
}
export default App;