import { createSlice } from "@reduxjs/toolkit";

const initialState={
    auth:''
}

const mainSlice=createSlice({
    name:'main',
    initialState,
    reducers:{
        setAuth:(state,action:{payload:string})=>{state.auth=action.payload}
    }
})

export const {actions:{setAuth},reducer:mainReducer}=mainSlice;