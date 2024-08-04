import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await fetch("http://localhost:3000/teachers");
    return response.json();
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    editTeacher: (state, action) => {
      const index = state.teachers.findIndex(
        (teacher) => teacher.id === action.payload.id
      );
      if (index !== -1) {
        state.teachers[index] = action.payload;
      }
    },
    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.teachers = action.payload;
      state.status = "succeeded";
    });
  },
});

export const { addTeacher, editTeacher, deleteTeacher } = teachersSlice.actions;
export default teachersSlice.reducer;
