import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { XPAlertObj, XPInfoAlert, testThis } from "../../../utils/Common/xpAlerts";
import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";
import { formInit } from '../../../services/App/ListData/stationList';
import { useFacDispatchContext } from "./FacultyProvider";
import { useFacContext } from "./FacultyProvider";
import { useFacultyForm } from "./FacultyHook";
import { isDuplicate } from "../../Utils/Helper";


export const FacultyForm = ({ onToggleModal, formObj }) => {
  let [duplicateError, setDuplicateError] = useState("");
  const { form, handleValueChange, errors, setErrors, validateForm, initForm } = useFacultyForm({ formObj });

  const dispatch = useFacDispatchContext();
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

    const dupValue = isDuplicate.isFacultyDuplicate(form, facs);
    if(dupValue.status){
      setDuplicateError(dupValue.error);
      return false;
    }

      if(form.faculty_id > 0){
        dispatch({ type: XPCrudType.byType(XPCrudType.Update), fac: form }); 
        testThis(alertObj, "Faculty", "edited", onToggleModal())
        XPInfoAlert(alertObj);
      } else{
        form.faculty_id = facs.length + 1;
        dispatch({ type: XPCrudType.byType(XPCrudType.Add), fac: form });
        testThis(alertObj, "Faculty", "added")
        XPInfoAlert(alertObj);
      }
      
    initForm(formInit);
  }

  return (
    <Form>
      <p>{duplicateError}</p>
      <input
        type="hidden"
        id="faculty_id"
        name="faculty_id"
        value={form.faculty_id}
        onChange={handleValueChange}
      />
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Faculty Name</Form.Label>
        <Form.Control
          type="name"
          name="faculty_name"
          value={form.faculty_name}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["faculty_name"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["faculty_name"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Faculty Code</Form.Label>
        <Form.Control
          type="name"
          name="faculty_code"
          value={form.faculty_code}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["faculty_code"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["faculty_code"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stName" className="mb-2">
        <Form.Label>Faculty Unique Id</Form.Label>
        <Form.Control
          type="name"
          name="faculty_uniqueid"
          value={form.faculty_uniqueid}
          onChange={(e) => {
            handleValueChange(e);
          }}
          className="form-control"
          isInvalid={!!errors["faculty_uniqueid"]}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors["faculty_uniqueid"]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="stActive" className="col col-sm-12">
        <Form.Check
          type="checkbox"
          name="faculty_status"
          checked={form.faculty_active}
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
  );
};
