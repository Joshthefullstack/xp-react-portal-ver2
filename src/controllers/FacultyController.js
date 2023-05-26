import { addFaculty, editFaculty, deleteFaculty } from "../store/reducers/facultySlice";
import { useDispatch } from "react-redux";

export const useFacultyController = (form) => {
    const dispatch = useDispatch();

    const getAddFaculty = () => {
        dispatch(addFaculty(form))
    }

    const getEditFaculty = () => {
        dispatch(editFaculty(form))
    }

    const getDeleteFaculty = (faculty) => {
        dispatch(deleteFaculty(faculty))
    }

    return { getAddFaculty, getEditFaculty, getDeleteFaculty }
}
