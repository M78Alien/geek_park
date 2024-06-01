import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userReducer";
export default configureStore({
  reducer: {
    user: userReducer
  }
})