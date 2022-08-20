import { configureStore } from "@reduxjs/toolkit";
import { contactsApp } from "../App/appSlice";
import { mainReducer } from "./mainSlice";

export const store =  configureStore({
    reducer:{[contactsApp.reducerPath]:contactsApp.reducer,main:mainReducer},
    middleware:dMW=>dMW().concat(contactsApp.middleware),
    devTools:process.env.NODE_ENV!=='production'
})