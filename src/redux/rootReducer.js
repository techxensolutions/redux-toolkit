import { combineReducers } from "redux";
import studentReducer from "./reducers/studentReducer";
import adminReducer from "./reducers/adminReducer";

const rootReducer = combineReducers({
  adminReducer,
  studentReducer,
});

export default rootReducer;
