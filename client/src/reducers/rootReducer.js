import {combineReducers} from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import registryReducer from "./registryReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  registry: registryReducer
});