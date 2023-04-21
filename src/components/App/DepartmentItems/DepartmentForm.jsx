import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { XPAlertObj, XPInfoAlert } from "../../../utils/Common/xpAlerts";
import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";
import { depsformInit } from '../../../services/App/ListData/stationList';
import {  isDepartmentDuplicate } from "../../../services/App/ListData/stationList";
import { useDepDispatchContext, useFacContext } from "./DepartmentProvider";
import { useDepContext } from "./DepartmentProvider";
import { useDepartmentForm } from "./DepartmentHook";
import { isDuplicate } from '../../Utils/Helper';

function DepartmentForm({ onToggleModal, formObj }) {
  let [duplicateError, setDuplicateError] = useState("");
  const { form, setForm, handleValueChange, errors, setErrors, validateForm, initForm } = useDepartmentForm({ formObj });

  const dispatch = useDepDispatchContext();
  const deps = useDepContext();
  const facs = useFacContext();


  const onSubmitForm = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();

    alertObj.icon = "success";

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    const dupValue = isDuplicate.isDepartmentDuplicate(form, deps);
    if(dupValue.status){
      setDuplicateError(dupValue.error);
      return false;
    }

    let faculty_id = Number(form.faculty_id);
    let modForm = {...form, faculty_id}

  
      if(modForm.department_id > 0){
        dispatch({ type: XPCrudType.byType(XPCrudType.Update), dep: modForm }); 
        alertObj.message = "Department was updated successfully";
        alertObj.title = "Department updated successfully";
        alertObj.callback = onToggleModal;
        XPInfoAlert(alertObj)
      } else{
        modForm.department_id = deps.length + 1;
        dispatch({ type: XPCrudType.byType(XPCrudType.Add), dep: modForm });   
        alertObj.message = "Department was Added Successfully";
        alertObj.title = "Department Added";
        XPInfoAlert(alertObj)
      }
      
    initForm(depsformInit);
  }

  return (
<Form>
      <p>{duplicateError}</p>
      <input
        type="hidden"
        id="department_id"
        name="department_id"
        value={form.department_id}
        onChange={handleValueChange}
      />
      <Form.Group controlId="stName" className="mb-2">
          <Form.Select aria-label="Faculty Id" type="select" name="faculty_id" value={form.faculty_id} onChange={(e)=>{handleValueChange(e)}} isInvalid={!!errors["faculty_id"]}>
              <option value="0">-- Select Faculty --</option>
              {
                facs.map((faculty)=>{
                  return(
                    <option key={faculty.faculty_id} value={faculty.faculty_id}>{faculty.faculty_name}</option>
                  );
                })
              }
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors["faculty_id"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Department Name</Form.Label>
        <Form.Control
          type="name"
          name="department_name"
          value={form.department_name}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["department_name"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["department_name"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Department Code</Form.Label>
        <Form.Control
          type="name"
          name="department_code"
          value={form.department_code}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["department_code"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["department_code"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Department Unique Id</Form.Label>
        <Form.Control
          type="name"
          name="department_uniqueid"
          value={form.department_uniqueid}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["department_uniqueid"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["department_uniqueid"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stActive" className="col col-sm-12">
        <Form.Check
          type="checkbox"
          name="department_status"
          checked={form.department_status}
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

export default DepartmentForm;