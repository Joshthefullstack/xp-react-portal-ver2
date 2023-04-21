import React, { useState } from 'react'


export const useCourseOfStudyForm = ({ formObj }) => {
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
      const { department_id, courseofstudy_name, courseofstudy_shortname, courseofstudy_uniqueid, courseofstudy_awards, courseofstudy_duration, courseofstudy_requiredcreditunits, courseofstudy_advisor } = form;
      const newErrors = {};

      if(!department_id || department_id === 0){
        newErrors.department_id = "Kindly Supply a Valid Department"
      }
  
      if (!courseofstudy_name || courseofstudy_name === "")
      newErrors.courseofstudy_name = "Kindly Supply Course of Study Name!";
    else if (courseofstudy_name.length < 3)
      newErrors.courseofstudy_name = "Course of Study Name is too short!";
    else if (courseofstudy_name.length > 70)
      newErrors.courseofstudy_name = "Course of Study Name is too long!";

      if (!courseofstudy_shortname || courseofstudy_shortname === "")
      newErrors.courseofstudy_shortname = "Kindly Supply Course of Study Short Name!";
    else if (courseofstudy_shortname.length < 3)
      newErrors.courseofstudy_shortname = "Course of Study Short Name is too short!";
    else if (courseofstudy_shortname.length > 10)
      newErrors.courseofstudy_shortname = "Course of Study Short Name is too long!";
  
      if (!courseofstudy_uniqueid || courseofstudy_uniqueid === "")
      newErrors.courseofstudy_uniqueid = "Kindly Supply Course of Study Unique Id!";
    else if (courseofstudy_uniqueid.length < 3)
      newErrors.courseofstudy_uniqueid = "Course of Study Unique Id is too short!";
    else if (courseofstudy_uniqueid.length > 10)
      newErrors.courseofstudy_uniqueid = "Course of Study Unique Id is too long!";

      if (!courseofstudy_awards || courseofstudy_awards === "")
      newErrors.courseofstudy_awards = "Kindly Supply Course of Study Awards!";
    else if (courseofstudy_awards.length < 3)
      newErrors.courseofstudy_awards = "Course of Study Awards is too short!";
    else if (courseofstudy_awards.length > 70)
      newErrors.courseofstudy_awards = "Course of Study Awards is too long!";

      if(!courseofstudy_duration || courseofstudy_duration === 0){
        newErrors.courseofstudy_duration = "Kindly Supply a Valid Duration"
      }

      if(!courseofstudy_requiredcreditunits || courseofstudy_requiredcreditunits < 1){
        newErrors.courseofstudy_requiredcreditunits = "Kindly Supply a Valid Required Credit Units"
      }

  
      if (!courseofstudy_advisor || courseofstudy_advisor === "")
      newErrors.courseofstudy_advisor = "Kindly Supply Course of Study Advisor!";
    else if (courseofstudy_advisor.length < 3)
      newErrors.courseofstudy_advisor = "Course of Study Advisor is too short!";
    else if (courseofstudy_advisor.length > 70)
      newErrors.courseofstudy_advisor = "Course of Study Advisor is too long!";
  
      return newErrors;
    }
  
    const initForm = (form) => {
      setForm(form)
    }
  
    return { handleValueChange, form, setForm, initForm, validateForm, errors, setErrors };
  };