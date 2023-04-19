import { createContext, useReducer, useContext } from "react";
import { getAllFaculties } from "../../../services/App/ListData/stationList";
import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";


const FacContext = createContext(null);
const FacDispatchContext = createContext(null);

const FacultyProvider = ({ children }) => {
    const [facs, dispatch] = useReducer(facultyReducer, getAllFaculties());

    return (
        <FacContext.Provider value={facs}>
            <FacDispatchContext.Provider value={dispatch}>
                {children}
            </FacDispatchContext.Provider>
        </FacContext.Provider>
    );
};

export const action = {
    type: "",

}

function facultyReducer(facs, action) {
    const faculty = action.fac;
    switch (action.type) {
        case XPCrudType.byType(XPCrudType.Add): {
            // validate fas
            if (faculty !== null || faculty.faculty_id === 0) {
                return [...facs, faculty]
            }
            return false;
        }
        case XPCrudType.byType(XPCrudType.Update): {
            // validate fac
            if (faculty !== null || faculty.faculty_id > 0) {
                const index = facs.findIndex((m) => m.faculty_id === faculty.faculty_id);
                if (index !== -1) {
                    facs[index] = faculty;
                }
                return [...facs]
            }
            return false;
        }
        case XPCrudType.byType(XPCrudType.Delete):
            // validate facs
            if (faculty !== null || faculty.faculty_id) {
                facs = facs.filter((m) => m.faculty_id !== faculty.faculty_id);
                return [...facs];
            }
            return false;
        default:
            throw new Error()
    }
}

// COME AND START WORKING ON THE SEARCH


export const useFacContext = () => useContext(FacContext);
export const useFacDispatchContext = () => useContext(FacDispatchContext)

export default FacultyProvider;