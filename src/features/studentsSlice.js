// features/students/studentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await fetch("http://localhost:3000/students");
    return response.json();
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    editStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.students = action.payload;
      state.status = "succeeded";
    });
  },
});

export const { addStudent, editStudent, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
