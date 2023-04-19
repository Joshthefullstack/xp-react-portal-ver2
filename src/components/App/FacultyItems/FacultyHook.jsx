import { React, useState } from "react";

export const useFacultyForm = ({ formObj }) => {
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
      const { faculty_name, faculty_code, faculty_uniqueid } = form;
      const newErrors = {};
  
      if (!faculty_name || faculty_name === "")
      newErrors.faculty_name = "Kindly Supply Faculty Name!";
    else if (faculty_name.length < 3)
      newErrors.faculty_name = "Faculty Name is too short!";
    else if (faculty_name.length > 70)
      newErrors.faculty_name = "Faculty Name is too long!";
  
      if (!faculty_code || faculty_code === "")
      newErrors.faculty_code = "Kindly Supply Faculty Code!";
    else if (faculty_code.length < 3)
      newErrors.faculty_code = "Faculty Code is too short!";
    else if (faculty_code.length > 10)
      newErrors.faculty_code = "Faculty Code is too long!";
  
      if (!faculty_uniqueid || faculty_uniqueid === "")
      newErrors.faculty_uniqueid = "Kindly Supply Faculty Unique Id!";
    else if (faculty_uniqueid.length < 3)
      newErrors.faculty_uniqueid = "Faculty Unique Id is too short!";
    else if (faculty_uniqueid.length > 10)
      newErrors.faculty_uniqueid = "Faculty Unique Id is too long!";
  
      return newErrors;
    }
  
    const initForm = (form) => {
      setForm(form)
    }
  
    return { handleValueChange, form, initForm, validateForm, errors, setErrors };
  };
  