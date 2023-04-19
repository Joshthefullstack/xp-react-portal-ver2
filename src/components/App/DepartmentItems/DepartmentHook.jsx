import React, { useState } from 'react'


export const useDepartmentForm = ({ formObj }) => {
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
      const { department_name, department_code, department_uniqueid } = form;
      const newErrors = {};
  
      if (!department_name || department_name === "")
      newErrors.department_name = "Kindly Supply Department Name!";
    else if (department_name.length < 3)
      newErrors.department_name = "Department Name is too short!";
    else if (department_name.length > 70)
      newErrors.department_name = "Department Name is too long!";
  
      if (!department_code || department_code === "")
      newErrors.department_code = "Kindly Supply Department Code!";
    else if (department_code.length < 3)
      newErrors.department_code = "Department Code is too short!";
    else if (department_code.length > 10)
      newErrors.department_code = "Department Code is too long!";
  
      if (!department_uniqueid || department_uniqueid === "")
      newErrors.department_uniqueid = "Kindly Supply Department Unique Id!";
    else if (department_uniqueid.length < 3)
      newErrors.department_uniqueid = "Department Unique Id is too short!";
    else if (department_uniqueid.length > 10)
      newErrors.department_uniqueid = "Department Unique Id is too long!";
  
      return newErrors;
    }
  
    const initForm = (form) => {
      setForm(form)
    }
  
    return { handleValueChange, form, setForm, initForm, validateForm, errors, setErrors };
  };