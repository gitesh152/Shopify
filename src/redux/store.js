import { createStore } from "redux";
import rootReducers from "./reducer";

//Store
const store = createStore(rootReducers);

export default store;
