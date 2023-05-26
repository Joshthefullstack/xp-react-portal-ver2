import { createContext, useReducer, useContext, useCallback } from "react";
import { getAllFaculties } from "../../../services/App/ListData/stationList";
import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";
import { isDuplicate } from "../../Utils/Helper";

const FacContext = createContext(null);
const FacDispatchContext = createContext(null);

const FacultyProvider = ({ children }) => {
    const [facs, dispatch] = useReducer(facultyReducer, getAllFaculties());

    const sayHello = useCallback(()=>{
            console.log(facs.length);
    },[facs]) 

    const values = {facs, sayHello}

    return (
        <FacContext.Provider value={values}>
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
    const retVal=isDuplicate.isFacultyDuplicate(faculty, facs)
    switch (action.type) {
        case XPCrudType.byType(XPCrudType.Add): {
            // validate fas
            if (retVal.status) return facs
            return [...facs, faculty]
        }
        case XPCrudType.byType(XPCrudType.Update): {
            // validate fac
            if (retVal.status) return facs
            const index = facs.findIndex((m) => m.faculty_id === faculty.faculty_id);
            if (index !== -1) {
                facs[index] = faculty;
            }
            return [...facs]
        }
        case XPCrudType.byType(XPCrudType.Delete):
            // validate facs
            if (retVal.status) return facs
            facs = facs.filter((m) => m.faculty_id !== faculty.faculty_id);
            return [...facs];
        default:
            return facs
    }
}

// Don't put a useState in your reducer
// Let your reducer be straight to the point
// Don't put loops and unneccessary function in your reducer

// React has three parts, state(source of truth), action(functions that does something) and view(UI of the page)
// The essentials, Redux is a pattern and a library for managing and updating an application 


export const useFacContext = () => useContext(FacContext);
export const useFacDispatchContext = () => useContext(FacDispatchContext)

export default FacultyProvider;