import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { XPAlertObj, XPInfoAlert, testThis } from "../../../utils/Common/xpAlerts";
import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";
import { courseformInit } from '../../../services/App/ListData/stationList';
import { useCourseContext, useCourseDispatchContext, useDepContext } from "./CourseProvider";
import { useCourseForm } from "./CourseHook";
import { isDuplicate } from '../../Utils/Helper';



function CourseOfStudyForm({ onToggleModal, formObj }) {
  let [duplicateError, setDuplicateError] = useState("");
  const { form, handleValueChange, errors, setErrors, validateForm, initForm } = useCourseForm({ formObj });
  const CourseUnits = [3, 4, 5, 6];
  const CourseLevel = [100, 200, 300, 400, 500, 600, 700];
  const CourseSemester=[1, 2]

  const dispatch = useCourseDispatchContext();
  const deps = useDepContext();
  const course = useCourseContext();


  const onSubmitForm = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();

    alertObj.icon = "success";

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    const dupValue = isDuplicate.isCourseDuplicate(form, course);
    if(dupValue.status){
      setDuplicateError(dupValue.error);
      return false;
    }

    let department_id = parseInt(form.department_id);
    let course_units = Number(form.course_units);
    let course_level = Number(form.course_level);
    let course_semester = Number(form.course_semester)

    let modForm = {...form, course_units, department_id, course_level, course_semester};

      if(modForm.course_id > 0){
        dispatch({ type: XPCrudType.byType(XPCrudType.Update), course: modForm }); 
        testThis(alertObj, "Course was edited successfully", "Course was edited", onToggleModal());
        XPInfoAlert(alertObj)
      } else{
        modForm.course_id = course.length + 1;
        dispatch({ type: XPCrudType.byType(XPCrudType.Add), course: modForm });   
        testThis(alertObj, "Course was added successfully", "Course was added");
        XPInfoAlert(alertObj)
      }
    initForm(courseformInit);
  }

  return (
<Form>
      <p>{duplicateError}</p>
      <input
        type="hidden"
        id="course_id"
        name="course_id"
        value={form.course_id}
        onChange={handleValueChange}
      />
      <Form.Group controlId="stName" className="mb-2">
          <Form.Select aria-label="Department Id" type="select" name="department_id" value={form.department_id} onChange={(e)=>{handleValueChange(e)}} isInvalid={!!errors["department_id"]}>
              <option value="0">-- Select Department --</option>
              {
                deps.map((department)=>{
                  return(
                    <option key={department.department_id} value={department.department_id}>{department.department_name}</option>
                  );
                })
              }
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors["department_id"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          type="name"
          name="course_name"
          value={form.course_name}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["course_name"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["course_name"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Course Code</Form.Label>
        <Form.Control
          type="name"
          name="course_code"
          value={form.course_code}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["course_code"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["course_code"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-3">
        <Form.Label>Course Unique Id</Form.Label>
        <Form.Control
          type="name"
          name="course_uniqueid"
          value={form.course_uniqueid}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["course_uniqueid"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["course_uniqueid"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-4">
          <Form.Select aria-label="Units" type="select" name="course_units" value={form.course_units} onChange={(e)=>{handleValueChange(e)}} isInvalid={!!errors["course_units"]}>
              <option value="0">-- Select Units --</option>
              {
                CourseUnits.map((courseUnits, index)=>{
                  return(
                    <option key={index} value={courseUnits}>{courseUnits}</option>
                  );
                })
              }
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors["course_units"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-4">
          <Form.Select aria-label="Level" type="select" name="course_level" value={form.course_level} onChange={(e)=>{handleValueChange(e)}} isInvalid={!!errors["course_level"]}>
              <option value="0">-- Select Level --</option>
              {
                CourseLevel.map((level, index)=>{
                  return(
                    <option key={index} value={level}>{level}</option>
                  );
                })
              }
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors["course_level"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-4">
          <Form.Select aria-label="Semester" type="select" name="course_semester" value={form.course_semester} onChange={(e)=>{handleValueChange(e)}} isInvalid={!!errors["course_semester"]}>
              <option value="0">-- Select Semester --</option>
              {
                CourseSemester.map((semester, index)=>{
                  return(
                    <option key={index} value={semester}>{semester}</option>
                  );
                })
              }
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors["course_semester"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stActive" className="col col-sm-12">
        <Form.Check
          type="checkbox"
          name="course_status"
          checked={form.course_status}
          onChange={(e) => {
            handleValueChange(e);
          }}
          label="Is Active?"
        />
      </Form.Group>
      <Button variant="secondary" className="mt-2" onClick={(e)=>{onSubmitForm(e)}}>
        Submit
      </Button>
    </Form>
  )
}

export default CourseOfStudyForm;