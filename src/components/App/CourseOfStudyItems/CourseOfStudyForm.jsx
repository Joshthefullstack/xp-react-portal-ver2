import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { XPAlertObj, XPInfoAlert, testThis } from "../../../utils/Common/xpAlerts";
import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";
import { cosformInit } from '../../../services/App/ListData/stationList';
import { useCosContext, useCosDispatchContext, useDepContext } from "./CourseOfStudyProvider";
import { useCourseOfStudyForm } from "./CourseOfStudyHook";
import { isDuplicate } from '../../Utils/Helper';


function CourseOfStudyForm({ onToggleModal, formObj }) {
  let [duplicateError, setDuplicateError] = useState("");
  const { form, handleValueChange, errors, setErrors, validateForm, initForm } = useCourseOfStudyForm({ formObj });
  const DURATION = [4, 5, 6, 7];

  const dispatch = useCosDispatchContext();
  const deps = useDepContext();
  const cos = useCosContext();

  const onSubmitForm = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();

    alertObj.icon = "success";

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    const dupValue = isDuplicate.isCourseOfStudyDuplicate(form, cos);
    if(dupValue.status){
      setDuplicateError(dupValue.error);
      return false;
    }

    let department_id = parseInt(form.department_id);
    let courseofstudy_duration = Number(form.courseofstudy_duration);
    let courseofstudy_requiredcreditunits = Number(form.courseofstudy_requiredcreditunits)

    let modForm = {...form, department_id, courseofstudy_duration, courseofstudy_requiredcreditunits}

      if(modForm.courseofstudy_id > 0){
        dispatch({ type: XPCrudType.byType(XPCrudType.Update), cos: modForm }); 
        testThis(alertObj, "Course of Study", "edited", onToggleModal());
        XPInfoAlert(alertObj)
      } else{
        modForm.courseofstudy_id = cos.length + 1;
        dispatch({ type: XPCrudType.byType(XPCrudType.Add), cos: modForm });   
        testThis(alertObj, "Course of Study", "added");
        XPInfoAlert(alertObj)
      }

    initForm(cosformInit);
  }

  return (
<Form>
      <p>{duplicateError}</p>
      <input
        type="hidden"
        id="courseofstudy_id"
        name="courseofstudy_id"
        value={form.courseofstudy_id}
        onChange={handleValueChange}
      />
      <Form.Group controlId="stName" className="mb-2">
          <Form.Select aria-label="Faculty Id" type="select" name="department_id" value={form.department_id} onChange={(e)=>{handleValueChange(e)}} isInvalid={!!errors["department_id"]}>
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
        <Form.Label>Course of Study Name</Form.Label>
        <Form.Control
          type="name"
          name="courseofstudy_name"
          value={form.courseofstudy_name}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["courseofstudy_name"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["courseofstudy_name"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Course of Study Short Name</Form.Label>
        <Form.Control
          type="name"
          name="courseofstudy_shortname"
          value={form.courseofstudy_shortname}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["courseofstudy_shortname"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["courseofstudy_shortname"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Course of Study Unique Id</Form.Label>
        <Form.Control
          type="name"
          name="courseofstudy_uniqueid"
          value={form.courseofstudy_uniqueid}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["courseofstudy_uniqueid"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["courseofstudy_uniqueid"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-4">
        <Form.Label>Course of Study Awards</Form.Label>
        <Form.Control
          type="name"
          name="courseofstudy_awards"
          value={form.courseofstudy_awards}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["courseofstudy_awards"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["courseofstudy_awards"]}
        </Form.Control.Feedback>
      </Form.Group>
          {/* duration */}
      <Form.Group controlId="stName" className="mb-3">
          <Form.Select aria-label="Duration" type="select" name="courseofstudy_duration" value={form.courseofstudy_duration} onChange={(e)=>{handleValueChange(e)}} isInvalid={!!errors["courseofstudy_duration"]}>
              <option value="0">-- Select Duration --</option>
              {
                DURATION.map((duration, index)=>{
                  return(
                    <option key={index} value={duration}>{duration}</option>
                  );
                })
              }
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors["courseofstudy_duration"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Course of Study Required Credit Units</Form.Label>
        <Form.Control
          type="number"
          name="courseofstudy_requiredcreditunits"
          value={form.courseofstudy_requiredcreditunits}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["courseofstudy_requiredcreditunits"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["courseofstudy_requiredcreditunits"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Course of Study Advisor</Form.Label>
        <Form.Control
          type="name"
          name="courseofstudy_advisor"
          value={form.courseofstudy_advisor}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["courseofstudy_advisor"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["courseofstudy_advisor"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stActive" className="col col-sm-12">
        <Form.Check
          type="checkbox"
          name="courseofstudy_status"
          checked={form.courseofstudy_status}
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