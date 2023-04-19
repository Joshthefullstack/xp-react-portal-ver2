import React, { createContext, useReducer, useContext } from 'react';
import { getAllDepartments } from '../../../services/App/ListData/stationList';
import { getAllFaculties } from '../../../services/App/ListData/stationList';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';

const DepContext = createContext(null);
const DepDispatchContext = createContext(null);
const FacContext = createContext(null);

function DepartmentProvider({ children }) {
    const [deps, dispatch] = useReducer(departmentReducer, getAllDepartments());
    const facs = getAllFaculties();

  return (
    <FacContext.Provider value={facs}>
        <DepContext.Provider value={deps} >
            <DepDispatchContext.Provider value={dispatch}>
                {children}
            </DepDispatchContext.Provider>
        </DepContext.Provider>
    </FacContext.Provider>
  )
}

export const action = {
    type: ""
}

function departmentReducer(deps, action){
    let department = action.dep;
    let faculty_id = parseInt(department.faculty_id)
    switch(action.type){
        case XPCrudType.byType(XPCrudType.Add):
            if(department !== null || department.department_id === 0){
                department = {...department, faculty_id};
                return [...deps, department]
            }
            return false;
        case XPCrudType.byType(XPCrudType.Update):
            if(department !== null || department.department_id > 0){
                department = {...department, faculty_id};
                const index = deps.findIndex((m) => m.department_id === department.department_id);
                if(index !== -1){
                    deps[index] = department;
                }
                return [...deps]
            }
            return false;
        case XPCrudType.byType(XPCrudType.Delete):
            if(department !== null || department.department_id){
                deps = deps.filter((m)=> m.department_id !== department.department_id);
                return [...deps];
            }
            return false;
        default:
            throw new Error();
    }
}

export const useFacContext = () => useContext(FacContext);
export const useDepContext = () => useContext(DepContext);
export const useDepDispatchContext = () => useContext(DepDispatchContext);

export default DepartmentProvider