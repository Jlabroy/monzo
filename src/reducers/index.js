import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import app from "./app";
import apps from "./apps";
import user from "./user";
import users from "./users";

export default combineReducers({
  app,
  apps,
  form: formReducer,
  user,
  users,
});
