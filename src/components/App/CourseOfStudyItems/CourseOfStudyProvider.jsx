import React, { createContext, useReducer, useContext } from 'react';
import { getAllDepartments, getAllCourseOfStudies } from '../../../services/App/ListData/stationList';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';
import { isDuplicate } from '../../Utils/Helper';

const CosContext = createContext(null);
const CosDispatchContext = createContext(null);
const DepContext = createContext(null);

function CourseOfStudyProvider({ children }) {
    const [cos, dispatch] = useReducer(courseOfStudyReducer, getAllCourseOfStudies());
    const deps = getAllDepartments();

  return (
    <DepContext.Provider value={deps}>
        <CosContext.Provider value={cos} >
            <CosDispatchContext.Provider value={dispatch}>
                {children}
            </CosDispatchContext.Provider>
        </CosContext.Provider>
    </DepContext.Provider>
  )
}

export const action = {
    type: ""
}

function courseOfStudyReducer(cos, action){
    let courseOfStudy = action.cos;
    const retVal  = isDuplicate.isCourseOfStudyDuplicate(courseOfStudy, cos)
    switch(action.type){
        case XPCrudType.byType(XPCrudType.Add):
            if(!retVal.status) return cos;
            return [...cos, courseOfStudy]
        case XPCrudType.byType(XPCrudType.Update):
            if(!retVal.status) return cos;
            const index = cos.findIndex((m) => m.courseofstudy_id === courseOfStudy.courseofstudy_id);
            if(index !== -1){
                cos[index] = courseOfStudy;
            }
            return [...cos]
        case XPCrudType.byType(XPCrudType.Delete):
            if(!retVal.status) return cos;
            cos = cos.filter((m)=> m.courseofstudy_id !== courseOfStudy.courseofstudy_id);
            return [...cos];
        default:
            return cos;
    }
}

export const useCosContext = () => useContext(CosContext);
export const useDepContext = () => useContext(DepContext);
export const useCosDispatchContext = () => useContext(CosDispatchContext);

export default CourseOfStudyProvider;