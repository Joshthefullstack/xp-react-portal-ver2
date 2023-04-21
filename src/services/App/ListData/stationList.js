import {Departments, Faculties, CourseOfStudy, Course, Lecturer} from "../AppData/academicList";

export const formInit = {
    faculty_id: 0,
    faculty_name: "",
    faculty_uniqueid: "",
    faculty_code: "",
    faculty_status: 0
}

export const depsformInit = {
    faculty_id: 0,
    department_id: 0,
    department_name: "",
    department_uniqueid: "",
    department_code: "",
    department_status: 0
}


export const cosformInit = {
    department_id: 0,
    courseofstudy_id: 0,
    courseofstudy_name: "",
    courseofstudy_shortname: "",
    courseofstudy_uniqueid: "",
    courseofstudy_awards: "",
    courseofstudy_duration: 0,
    courseofstudy_requiredcreditunits: 0,
    courseofstudy_advisor: "",
    courseofstudy_status: 0
}

export const courseformInit = {
    department_id: 0,
    course_id: 0,
    course_name: "",
    course_code: "",
    course_uniqueid: "",
    course_units: 0,
    course_level: 0,
    course_semester: 0,
    course_status: 0
}

export const lecturerformInit = {
    department_id: 0,
    lecturer_id: 0,
    lecturer_surname: "",
    lecturer_firstname: "",
    lecturer_othername: "",
    lecturer_staffid: "",
    lecturer_status: ""
}

export const getAllFaculties = () => {
    return Faculties;
}

export const getAllDepartments = () => {
    return Departments;
}

export const getAllCourseOfStudies = () => {
    return CourseOfStudy;
}

export const getAllCourse = () => {
    return Course;
}

export const getAllLecturer = () => {
    return Lecturer;
}

