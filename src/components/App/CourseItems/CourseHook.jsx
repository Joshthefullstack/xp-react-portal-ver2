import React, { useState } from 'react'


export const useCourseForm = ({ formObj }) => {
    const [form, setForm] = useState(formObj);
    const [errors, setErrors] = useState({});
  
    const handleValueChange = (e) => {
      const { name, value } = e.target;
      if (e.target.type === "checkbox") {      
        setForm({ ...form, [name]: e.target.checked });
      } else {
        setForm({ ...form, [name]: value });
      }
  
      if (!!errors[e.target.name])
        setErrors({
          ...errors,
          [e.target.name]: null,
        });
    };
  
    const validateForm = () => {
      const { department_id, course_name, course_code, course_uniqueid, course_units, course_level, course_semester } = form;
      const newErrors = {};

      if(!department_id || department_id === 0){
        newErrors.department_id = "Kindly Supply a Valid Department"
      }
  
      if (!course_name || course_name === "")
      newErrors.course_name = "Kindly Supply Course Name!";
    else if (course_name.length < 3)
      newErrors.course_name = "Course Name is too short!";
    else if (course_name.length > 70)
      newErrors.course_name = "Course Name is too long!";

      if (!course_code || course_code === "")
      newErrors.course_code = "Kindly Supply Course Code!";
    else if (course_code.length < 3)
      newErrors.course_code = "Course Code is too short!";
    else if (course_code.length > 10)
      newErrors.course_code = "Course Code is too long!";
  
      if (!course_uniqueid || course_uniqueid === "")
      newErrors.course_uniqueid = "Kindly Supply Course Unique Id!";
    else if (course_uniqueid.length < 3)
      newErrors.course_uniqueid = "Course Unique Id is too short!";
    else if (course_uniqueid.length > 10)
      newErrors.course_uniqueid = "Course Unique Id is too long!";

      if(!course_units || course_units === 0){
        newErrors.courseofstudy_duration = "Kindly Supply a Valid Course Units"
      }

      if(!course_level || course_level === 0){
        newErrors.course_level = "Kindly Supply a Valid Required Course Level";
      }

      if(!course_semester || course_semester === 0){
        newErrors.course_level = "Kindly Supply a Valid Required Course Semester";
      }

  
      return newErrors;
    }
  
    const initForm = (form) => {
      setForm(form)
    }
  
    return { handleValueChange, form, setForm, initForm, validateForm, errors, setErrors };
  };