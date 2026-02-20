import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import loadingBar from "./loadingBar";

export default combineReducers({
    authedUser,
    users,
    questions,
    loadingBar,
});