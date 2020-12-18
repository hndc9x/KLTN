import { combineReducers } from 'redux';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import userReducer from './user.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';

const rootReducer = combineReducers({ 
    category : categoryReducer,
    product : productReducer,
    user : userReducer,
    auth : authReducer,
    cart : cartReducer
});

export default rootReducer;