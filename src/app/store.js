// store.js
import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../features/studentsSlice";
import teachersReducer from "../features/teachersSlice";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teachersReducer,
  },
});
