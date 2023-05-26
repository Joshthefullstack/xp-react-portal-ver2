import { combineReducers } from "@reduxjs/toolkit"
import facultyReducer from "./reducers/facultySlice"

export const rootReducer = combineReducers(
    {
        faculty: facultyReducer
    }
)
