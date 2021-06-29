import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducers";

const reducer = combineReducers({ userReducer });

const enhanceComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, enhanceComposer(applyMiddleware(thunk)));
export default store;
