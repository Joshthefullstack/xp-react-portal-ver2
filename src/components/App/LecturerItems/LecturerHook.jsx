import React, { useState } from 'react'


export const useLecturerForm = ({ formObj }) => {
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
      const { department_id, lecturer_firstname, lecturer_surname, lecturer_othername, lecturer_staffid} = form;
      const newErrors = {};

      if(!department_id || department_id === 0){
        newErrors.department_id = "Kindly Supply a Valid Department"
      }
  
      if (!lecturer_firstname || lecturer_firstname === "")
      newErrors.lecturer_firstname = "Kindly Supply Lecturer First Name!";
    else if (lecturer_firstname.length < 3)
      newErrors.lecturer_firstname = "Lecturer First Name is too short!";
    else if (lecturer_firstname.length > 70)
      newErrors.lecturer_firstname = "Lecturer First Name is too long!";

      if (!lecturer_surname || lecturer_surname === "")
      newErrors.lecturer_surname = "Kindly Supply Lecturer Surname!";
    else if (lecturer_surname.length < 3)
      newErrors.lecturer_surname = "Lecturer Surname is too short!";
    else if (lecturer_surname.length > 50)
      newErrors.lecturer_surname = "Lecturer Surname is too long!";
  
      if (!lecturer_othername || lecturer_othername === "")
      newErrors.lecturer_othername = "Kindly Supply Lecturer Other Name!";
    else if (lecturer_othername.length < 3)
      newErrors.lecturer_othername = "Lecturer Other Name is too short!";
    else if (lecturer_othername.length > 50)
      newErrors.lecturer_othername = "Lecturer Other Name is too long!";

      if (!lecturer_staffid || lecturer_staffid === "")
      newErrors.lecturer_staffid = "Kindly Supply Lecturer Staff Id!";
    else if (lecturer_staffid.length < 3)
      newErrors.lecturer_staffid = "Lecturer Staff Id is too short!";
    else if (lecturer_staffid.length > 10)
      newErrors.lecturer_staffid = "Lecturer Staff Id is too long!";
  
      return newErrors;
    }
  
    const initForm = (form) => {
      setForm(form)
    }
  
    return { handleValueChange, form, setForm, initForm, validateForm, errors, setErrors };
  };