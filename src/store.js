import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const store = createStore(
  combineReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
