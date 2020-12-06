import React, { Component, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import PrivateRoute from "../src/components/HOC/PrivateRoute";
import Home from "../src/views/dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  //xac thuc tai khoan
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);
  return (
    <div className="App">
      <React.Suspense fallback={loading}>
        <Switch>
          <PrivateRoute path="/" exact component={TheLayout} />
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
          {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
          {/* <PrivateRoute path="/products" component= {Products} />
      <PrivateRoute path="/orders"  component={Orders} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} /> */}
        </Switch>
      </React.Suspense>
    </div>
    // <HashRouter>
    //     <React.Suspense fallback={loading}>
    //       <Switch>
    //         <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
    //         <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
    //         <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
    //         <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
    //         {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
    //         {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
    //         <PrivateRoute path="/" exact component={Home} />
    //         {/* <PrivateRoute path="/" exact component={Home} render={props => <TheLayout {...props}/>}/> */}
    //       </Switch>
    //     </React.Suspense>
    // </HashRouter>
  );
}

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// class App extends Component {
//   render() {
    
//   }
// }

export default App;
