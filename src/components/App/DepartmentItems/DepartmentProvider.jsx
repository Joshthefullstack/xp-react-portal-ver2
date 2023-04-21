import React, { createContext, useReducer, useContext } from 'react';
import { getAllDepartments, getAllFaculties } from '../../../services/App/ListData/stationList';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';
import { isDuplicate } from "../../Utils/Helper";

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
    const retVal=isDuplicate.isDepartmentDuplicate(department, deps)
    switch(action.type){
        case XPCrudType.byType(XPCrudType.Add):
            if(!retVal.status) return deps
            return [...deps, department]
        case XPCrudType.byType(XPCrudType.Update):
            if(!retVal.status) return deps
            const index = deps.findIndex((m) => m.department_id === department.department_id);
            if(index !== -1){
                deps[index] = department;
            }
            return [...deps]
        case XPCrudType.byType(XPCrudType.Delete):
            if(!retVal.status) return deps
            deps = deps.filter((m)=> m.department_id !== department.department_id);
            return [...deps];
        default:
            return deps
    }
}

export const useFacContext = () => useContext(FacContext);
export const useDepContext = () => useContext(DepContext);
export const useDepDispatchContext = () => useContext(DepDispatchContext);

export default DepartmentProvider