let Faculties = [
    {
        faculty_id: 1,
        faculty_name: "Faculty of Management Sciences",
        faculty_code: "MSA201",
        faculty_uniqueid: "MSA2023",
        faculty_status: 1
    },
    {
        faculty_id: 2,
        faculty_name: "Faculty of Engineering",
        faculty_code: "ENG201",
        faculty_uniqueid: "ENG2023",
        faculty_status: 0
    },
    {
        faculty_id: 3,
        faculty_name: "Faculty of Medical Sciences",
        faculty_code: "MED201",
        faculty_uniqueid: "MED2023",
        faculty_status: 0
    }
]

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
        faculty_uniqueid: formVal.uniqueid,
        faculty_code: formVal.code,
        faculty_status: formVal.faculty_status
    }
}

export const getAllFaculties = () => {
    return Faculties;
}

export const addFaculties = (form, faculties) => {
    form.faculty_id = faculties.length + 1;
    faculties.push(form)
}

export const editFaculties = (facult, setFacult, faculties, form) => {
    setFacult(facult = faculties.find(m => m.faculty_id === form.faculty_id))
    const index = faculties.indexOf(facult);
    faculties.splice(index, 1)
    setFacult(facult = form);
    faculties.splice(index, 0, facult)
}

export const deleteFaculties = (faculty, faculties, facult, setFacult) => {
    setFacult(facult = faculties.find(m => m.faculty_id === faculty.faculty_id))
    const index = faculties.indexOf(facult);
    faculties.splice(index, 1)
}