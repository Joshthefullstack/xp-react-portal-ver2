export const getStoreFaculties = (state) => state.faculty.faculties
export const getActiveStoreFaculties = (state) => state.faculty.faculties.filter((f)=>f.faculty_status === 1);
export const isFacultyValid = (state) => state.faculty.isValid