import React, { createContext, useReducer, useContext } from 'react';
import { getAllDepartments, getAllCourse } from '../../../services/App/ListData/stationList';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';
import { isDuplicate } from '../../Utils/Helper';

const CourseContext = createContext(null);
const CourseDispatchContext = createContext(null);
const DepContext = createContext(null);

function CourseProvider({ children }) {
    const [courses, dispatch] = useReducer(courseReducer, getAllCourse());
    const deps = getAllDepartments();

  return (
    <DepContext.Provider value={deps}>
        <CourseContext.Provider value={courses} >
            <CourseDispatchContext.Provider value={dispatch}>
                {children}
            </CourseDispatchContext.Provider>
        </CourseContext.Provider>
    </DepContext.Provider>
  )
}

export const action = {
    type: ""
}

function courseReducer(courses, action){
    let course = action.course;
    const retVal  = isDuplicate.isCourseDuplicate(course, courses)
    switch(action.type){
        case XPCrudType.byType(XPCrudType.Add):
            if(retVal.status) return courses;
            return [...courses, course]
        case XPCrudType.byType(XPCrudType.Update):
            if(retVal.status) return courses;
                const index = courses.findIndex((m) => m.course_id === course.course_id);
                if(index !== -1){
                    courses[index] = course;
                }
                return [...courses]
        case XPCrudType.byType(XPCrudType.Delete):
            if(retVal.status) return courses;
                courses = courses.filter((m)=> m.course_id !== course.course_id);
                return [...courses];
        default:
            return courses;
    }
}

export const useCourseContext = () => useContext(CourseContext);
export const useDepContext = () => useContext(DepContext);
export const useCourseDispatchContext = () => useContext(CourseDispatchContext);

export default CourseProvider;