import React, { createContext, useReducer, useContext } from 'react';
import { getAllDepartments, getAllLecturer } from '../../../services/App/ListData/stationList';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';
import { isDuplicate } from '../../Utils/Helper';

const LecturerContext = createContext(null);
const LecturerDispatchContext = createContext(null);
const DepContext = createContext(null);

function CourseProvider({ children }) {
    const [lecturers, dispatch] = useReducer(lecturerReducer, getAllLecturer());
    const deps = getAllDepartments();

  return (
    <DepContext.Provider value={deps}>
        <LecturerContext.Provider value={lecturers} >
            <LecturerDispatchContext.Provider value={dispatch}>
                {children}
            </LecturerDispatchContext.Provider>
        </LecturerContext.Provider>
    </DepContext.Provider>
  )
}

export const action = {
    type: ""
}

function lecturerReducer(lecturers, action){
    let lecturer = action.lecturer;
    const retVal = isDuplicate.isLecturerDuplicate(lecturer, lecturers)
    switch(action.type){
        case XPCrudType.byType(XPCrudType.Add):
            if(!retVal.status) return lecturers;
            return [...lecturers, lecturer]
        case XPCrudType.byType(XPCrudType.Update):
            if(!retVal.status) return lecturers;
            const index = lecturers.findIndex((m) => m.lecturer_id === lecturer.lecturer_id);
            if(index !== -1){
                lecturers[index] = lecturer;
            }
            return [...lecturers]
        case XPCrudType.byType(XPCrudType.Delete):
            if(!retVal.status) return lecturers;
            lecturers = lecturers.filter((m)=> m.lecturer_id !== lecturer.lecturer_id);
            return [...lecturers];
        default:
            throw new Error();
    }
}

export const useLecturerContext = () => useContext(LecturerContext);
export const useDepContext = () => useContext(DepContext);
export const useLecturerDispatchContext = () => useContext(LecturerDispatchContext);

export default CourseProvider;