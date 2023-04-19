import {Departments} from "../AppData/academicList";
import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";
import { Faculties } from "../AppData/academicList";

export const formInit = {
    faculty_id: 0,
    faculty_name: "",
    faculty_uniqueid: "",
    faculty_code: "",
    faculty_status: 0
}

export const toFormVal = (faculty) => {
    return {
        faculty_id: faculty.faculty_id,
        faculty_name: faculty.faculty_name,
        faculty_uniqueid: faculty.faculty_uniqueid,
        faculty_code: faculty.faculty_code,
        faculty_status: faculty.faculty_status
    }
}

export const toStatObj = (formVal) => {
    return{
        faculty_id: formVal.faculty_id,
        faculty_name: formVal.faculty_name,
        faculty_uniqueid: formVal.faculty_uniqueid,
        faculty_code: formVal.faculty_code,
        faculty_status: formVal.faculty_status
    }
}

export const depsformInit = {
    faculty_id: 0,
    department_id: 0,
    department_name: "",
    department_uniqueid: "",
    department_code: "",
    department_status: 0
}

export const depstoStatObj = (formVal) => {
    return{
        faculty_id: formVal.faculty_id,
        department_id: formVal.department_id,
        department_name: formVal.department_name,
        department_uniqueid: formVal.department_uniqueid,
        department_code: formVal.department_code,
        department_status: formVal.department_status
    }
}

export const depstoFormVal = (department) => {
    return {
        faculty_id: department.faculty_id,
        department_id: department.department_id,
        department_name: department.department_name,
        department_uniqueid: department.department_uniqueid,
        department_code: department.department_code,
        department_status: department.department_status
    }
}

export const getAllFaculties = () => {
    return Faculties;
}

export const getAllDepartments = () => {
    return Departments;
}

let searchData = null;

export const getSearchData = () => {
    return searchData
}


export const isFacultyDuplicate = (faculty) => {
    let error = "";
    let item = "";
    const dupName = Faculties.filter((f)=>f.faculty_name.toLowerCase() === faculty.faculty_name.toLowerCase());

    if((faculty.faculty_id === 0 && dupName.length > 0) || (faculty.faculty_id > 0 && dupName.length > 1)){
        error = "Faculty Name already exists";
        item = "name";
        return { status: true, error, item };
    }

    const dupCode = Faculties.filter((f) => f.faculty_code.toLowerCase() === faculty.faculty_code.toLowerCase())
    
    if((faculty.faculty_id === 0 && dupCode.length > 0) || (faculty.faculty_id > 0 && dupCode.length > 1)){
        error = "Faculty code already exists";
        item = "code";
        return { status: true, error, item };
    }

    const dupUniqueId = Faculties.filter((f) => f.faculty_uniqueid.toLowerCase() === faculty.faculty_uniqueid.toLowerCase());

    if((faculty.faculty_id === 0 && dupUniqueId.length > 0) || (faculty.faculty_uniqueid > 0 && dupUniqueId.length > 1)){
        error = "Faculty Unique Id already exists";
        item = "uniqueid";
        return { status: true, error, item };
    }
    return { status: false, error, item };
}


export const isDepartmentDuplicate = (department) => {
    let error = "";
    let item = "";
    const dupName = Departments.filter((f)=>f.department_name.toLowerCase() === department.department_name.toLowerCase());

    if((department.department_id === 0 && dupName.length > 0) || (department.department_id > 0 && dupName.length > 1)){
        error = "Department Name already exists";
        item = "name";
        return { status: true, error, item };
    }

    const dupCode = Departments.filter((f) => f.department_code.toLowerCase() === department.department_code.toLowerCase())
    
    if((department.department_id === 0 && dupCode.length > 0) || (department.department_id > 0 && dupCode.length > 1)){
        error = "Department code already exists";
        item = "code";
        return { status: true, error, item };
    }

    const dupUniqueId = Departments.filter((f) => f.department_uniqueid.toLowerCase() === department.department_uniqueid.toLowerCase());

    if((department.department_id === 0 && dupUniqueId.length > 0) || (department.department_id > 0 && dupUniqueId.length > 1)){
        error = "Department Unique Id already exists";
        item = "uniqueid";
        return { status: true, error, item };
    }
    return { status: false, error, item };
}