import { createStore, combineReducers, applyMiddleware } from "redux";
import { BlankRedecers } from "./StoreReducer/BlankReducers";
import { CartItemReducer } from "./StoreReducer/CartItemReducer";
import { CountReducer } from "./StoreReducer/CountReducer";
import AuthReducers from "./StoreReducer/AuthReducers";
import addressReducer from "./StoreReducer/AddressReducers";
import AddToCartReducers from "./StoreReducer/AddToCartReducers";
import PatientReducers from "./StoreReducer/PatientReducers";
import OrderReducer from "./StoreReducer/OrderReducer";
import { ProductsReducer } from "./StoreReducer/ProductReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    cart: AddToCartReducers,
    cartItem: CartItemReducer,
    blankArr: BlankRedecers,
    productItem: ProductsReducer,
    count: CountReducer,
    auth : AuthReducers,
    address : addressReducer,
    patients : PatientReducers,
    order : OrderReducer,
});

const Store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(thunk)
));

export default Store;
