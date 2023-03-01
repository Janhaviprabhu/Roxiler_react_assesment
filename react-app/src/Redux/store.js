import { legacy_createStore, applyMiddleware, combineReducers } from "redux"
import TodoReducer from "./reducer";
import thunk from "redux-thunk"
let rootReducer = combineReducers({ todo: TodoReducer })
export const MyStore = legacy_createStore(rootReducer, applyMiddleware(thunk));