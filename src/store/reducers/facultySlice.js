import { createSlice } from "@reduxjs/toolkit";
import { getAllFaculties } from "../../services/App/ListData/stationList";
import { isDuplicate } from "../../components/Utils/Helper";


const initialState = {
  isValid: false,
  error: "",
  faculties: getAllFaculties(),
};

const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    addFaculty: (state, action)=>{
        const retVal = isDuplicate.isFacultyDuplicate(
            state.faculties,
            action.payload
          );
          console.log(retVal)
          if (retVal.status) {
            state.isValid = !retVal.status;
            state.error = retVal.error;
            return;
          }
        state.faculties.push(action.payload)
    },
    editFaculty: (state, action) => {
        // const retVal = isDuplicate.isFacultyDuplicate(
        //     state.faculties,
        //     action.payload
        //   );
        //   if (retVal.status) {
        //     state.isValid = !retVal.status;
        //     state.error = retVal.error;
        //     return;
        //   }
      const index = state.faculties.findIndex(
        (m) => m.faculty_id === action.payload.faculty_id
      );
      if (index !== -1) {
        // my problem is here
        state.faculties[index] = action.payload;
      }
    },
    deleteFaculty: (state, action) => {
      state.faculties = state.faculties.filter(
        (c) => c.faculty_id !== action.payload.faculty_id
      );
    },
  },
});

export const { addFaculty, editFaculty, deleteFaculty } = facultySlice.actions;
export default facultySlice.reducer;
