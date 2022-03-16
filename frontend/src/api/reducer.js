import { combineReducers } from "@reduxjs/toolkit";
import imageReducer from "../pages/CaptureImagePage/reducer";
export default combineReducers({
  image: imageReducer,
});
