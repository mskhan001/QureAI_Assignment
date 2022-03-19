import { configureStore } from "@reduxjs/toolkit";
import reducer from "../api/reducer";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export default store;
