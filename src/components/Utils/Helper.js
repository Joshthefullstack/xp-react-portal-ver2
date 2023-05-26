// change to checkDuplicate
export class isDuplicate {
     static isFacultyDuplicate(faculties, faculty){
        let error = "";
        let item = "";
        const dupName = faculties.filter((f)=>f.faculty_name.trim().toLowerCase() === faculty.faculty_name.trim().toLowerCase());
        if((dupName.length > 0)){
            error = `Faculty: ${faculty.faculty_name} already exists`;
            item = "name";
            return { status: true, error, item };
        }
    
        const dupCode = faculties.filter((f) => f.faculty_code.trim().toLowerCase() === faculty.faculty_code.toLowerCase())
        
        if(dupCode.length > 0){
            error = `Faculty Code: ${faculty.faculty_code} already exists`;
            item = "code";
            return { status: true, error, item };
        }

        const dupUniqueIds = faculties.filter((f) => f.faculty_uniqueid.toLowerCase() === faculty.faculty_uniqueid.toLowerCase());

        if(dupUniqueIds > 0){
            error = `Faculty Unique Id: ${faculty.faculty_uniqueid} already exists`;
            item = "uniqueid";
            return { status: true, error, item };
        }
        return { status: false, error, item };
    }

    static isDepartmentDuplicate = (department, Departments) => {
        let error = "";
        let item = "";
        const dupName = Departments.filter((f)=>f.department_name.toLowerCase() === department.department_name.toLowerCase());
    
        if((department.department_id === 0 && dupName.length > 0) || (department.department_id > 0 && dupName.length > 1)){
            error = `Department: ${department.department_name} already exists`;
            item = "name";
            return { status: true, error, item };
        }
    
        const dupCode = Departments.filter((f) => f.department_code.toLowerCase() === department.department_code.toLowerCase())
        
        if((department.department_id === 0 && dupCode.length > 0) || (department.department_id > 0 && dupCode.length > 1)){
            error = `Department Code: ${department.department_code} already exists`;
            item = "code";
            return { status: true, error, item };
        }
    
        const dupUniqueId = Departments.filter((f) => f.department_uniqueid.toLowerCase() === department.department_uniqueid.toLowerCase());
    
        if((department.department_id === 0 && dupUniqueId.length > 0) || (department.department_id > 0 && dupUniqueId.length > 1)){
            error = `Department Unique Id: ${department.department_uniqueid} already exists`;
            item = "uniqueid";
            return { status: true, error, item };
        }
        return { status: false, error, item };
    }

    static isCourseOfStudyDuplicate = (courseOfStudy, CourseOfStudy) => {
        let error = "";
        let item = "";
        
        const dupName = CourseOfStudy.filter((f)=>f.courseofstudy_name.toLowerCase() === courseOfStudy.courseofstudy_name.toLowerCase());
    
        if((courseOfStudy.courseofstudy_id === 0 && dupName.length > 0) || (courseOfStudy.courseofstudy_id > 0 && dupName.length > 1)){
            error = `Course of Study: ${courseOfStudy.courseofstudy_name} already exists`;
            item = "name";
            return { status: true, error, item };
        }
    
        const dupShortName = CourseOfStudy.filter((f) => f.courseofstudy_shortname.toLowerCase() === courseOfStudy.courseofstudy_shortname.toLowerCase())
        
        if((courseOfStudy.courseofstudy_id === 0 && dupShortName.length > 0) || (courseOfStudy.courseofstudy_id > 0 && dupShortName.length > 1)){
            error = `Course of Study Short Name: ${courseOfStudy.courseofstudy_shortname} already exists`;
            item = "shortname";
            return { status: true, error, item };
        }
        
        const dupUniqueId = CourseOfStudy.filter((f) => f.courseofstudy_uniqueid.toLowerCase() === courseOfStudy.courseofstudy_uniqueid.toLowerCase());
        
        if((courseOfStudy.courseofstudy_id === 0 && dupUniqueId.length > 0) || (courseOfStudy.courseofstudy_id > 0 && dupUniqueId.length > 1)){
            error = `Course of Study Unique Id: ${courseOfStudy.courseofstudy_uniqueid} already exists`;
            item = "uniqueid";
            return { status: true, error, item };
        }
    
        const dupAwards = CourseOfStudy.filter((f) => f.courseofstudy_awards.toLowerCase() === courseOfStudy.courseofstudy_awards.toLowerCase())
        
        if((courseOfStudy.courseofstudy_id === 0 && dupAwards.length > 0) || (courseOfStudy.courseofstudy_id > 0 && dupAwards.length > 1)){
            error = `Course of study Awards: ${courseOfStudy.courseofstudy_awards} already exists`;
            item = "shortname";
            return { status: true, error, item };
        }
        
        return { status: false, error, item };
    }

    static isCourseDuplicate = (course, Course) => {
        let error = "";
        let item = "";
        
        const dupName = Course.filter((f)=>f.course_name.toLowerCase() === course.course_name.toLowerCase());
    
        if((course.course_id === 0 && dupName.length > 0) || (course.course_id > 0 && dupName.length > 1)){
            error = `Course: ${course.course_name} already exists`;
            item = "name";
            return { status: true, error, item };
        }
    
        const dupCode = Course.filter((f) => f.course_code.toLowerCase() === course.course_code.toLowerCase())
        
        if((course.course_id === 0 && dupCode.length > 0) || (course.course_id > 0 && dupCode.length > 1)){
            error = `Course Code: ${course.course_code} already exists`;
            item = "shortname";
            return { status: true, error, item };
        }
        
        const dupUniqueId = Course.filter((f) => f.course_uniqueid.toLowerCase() === course.course_uniqueid.toLowerCase());
        
        if((course.course_id === 0 && dupUniqueId.length > 0) || (course.course_id > 0 && dupUniqueId.length > 1)){
            error = `Course Unique Id: ${course.course_uniqueid}`;
            item = "uniqueid";
            return { status: true, error, item };
        }
        return { status: false, error, item };
    }

    static isLecturerDuplicate = (lecturer, Lecturer) => {
        let error = "";
        let item = "";
        
        const dupUniqueId = Lecturer.filter((f) => f.lecturer_staffid.toLowerCase() === lecturer.lecturer_staffid.toLowerCase());
        
        if((lecturer.lecturer_id === 0 && dupUniqueId.length > 0) || (lecturer.lecturer_id > 0 && dupUniqueId.length > 1)){
            error = `Lecturer Staff Id: ${lecturer.lecturer_staffid} already exists`;
            item = "staffid";
            return { status: true, error, item };
        }
    
    
        return { status: false, error, item };
    }

}