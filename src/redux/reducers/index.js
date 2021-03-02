import { combineReducers } from "redux";
import angkaReducer from "./angkareducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  Angka: angkaReducer,
  User: userReducer,
});

export default reducers;
