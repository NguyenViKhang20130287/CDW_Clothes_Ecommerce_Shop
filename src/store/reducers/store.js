
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import {root} from "./RootReducer";

export default configureStore({
    reducer: {
        auth: authReducer,
        root: root
    }
})
