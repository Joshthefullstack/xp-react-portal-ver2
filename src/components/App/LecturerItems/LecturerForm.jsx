import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { XPAlertObj, XPInfoAlert, testThis } from "../../../utils/Common/xpAlerts";
import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";
import { lecturerformInit } from '../../../services/App/ListData/stationList';
import { useLecturerContext, useLecturerDispatchContext, useDepContext } from "./LecturerProvider";
import { useLecturerForm } from "./LecturerHook";
import { isDuplicate } from '../../Utils/Helper';


function LecturerForm({ onToggleModal, formObj }) {
  let [duplicateError, setDuplicateError] = useState("");
  const { form, setForm, handleValueChange, errors, setErrors, validateForm, initForm } = useLecturerForm({ formObj });

  const dispatch = useLecturerDispatchContext();
  const deps = useDepContext();
  const lecturer = useLecturerContext();


  const onSubmitForm = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();

    alertObj.icon = "success";

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    const dupValue = isDuplicate.isLecturerDuplicate(form, lecturer);
    if(dupValue.status){
      setDuplicateError(dupValue.error);
      return false;
    }

    let department_id = parseInt(form.department_id);
    let modForm = {...form, department_id}

      if(modForm.lecturer_id > 0){
        dispatch({ type: XPCrudType.byType(XPCrudType.Update), lecturer: modForm }); 
        testThis(alertObj, "Lecturer was edited successfully", "Lecturer was edited", onToggleModal());
        XPInfoAlert(alertObj)
      } else{
        modForm.lecturer_id = lecturer.length + 1;
        dispatch({ type: XPCrudType.byType(XPCrudType.Add), lecturer: modForm });   
        testThis(alertObj, "Lecturer was added successfully", "Lecturer was added");
        XPInfoAlert(alertObj)
      }

    initForm(lecturerformInit);
  }

  return (
<Form>
      <p>{duplicateError}</p>
      <input
        type="hidden"
        id="lecturer_id"
        name="lecturer_id"
        value={form.lecturer_id}
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
        <Form.Label>Lecturer SurName</Form.Label>
        <Form.Control
          type="name"
          name="lecturer_surname"
          value={form.lecturer_surname}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["lecturer_surname"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["lecturer_surname"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Lecturer First Name</Form.Label>
        <Form.Control
          type="name"
          name="lecturer_firstname"
          value={form.lecturer_firstname}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["lecturer_firstname"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["lecturer_firstname"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-3">
        <Form.Label>Lecturer Other Name</Form.Label>
        <Form.Control
          type="name"
          name="lecturer_othername"
          value={form.lecturer_othername}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["lecturer_othername"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["lecturer_othername"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-3">
        <Form.Label>Lecturer Staff Id</Form.Label>
        <Form.Control
          type="name"
          name="lecturer_staffid"
          value={form.lecturer_staffid}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["lecturer_staffid"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["lecturer_staffid"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stActive" className="col col-sm-12">
        <Form.Check
          type="checkbox"
          name="lecturer_status"
          checked={form.lecturer_status}
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

export default LecturerForm;