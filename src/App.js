import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';
import SendEmail from './containers/SendEmail';
import Tag from './containers/Tag';
import WareHouse from './containers/WareHouse';
import TheUser from './containers/User';



function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  //componentDidMount or componentDidUpdate
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
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/warehouse" component={WareHouse} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/tags" component={Tag} />
        <PrivateRoute path="/sendEmail" component={SendEmail} />
        <PrivateRoute path="/user" component={TheUser} />


        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
