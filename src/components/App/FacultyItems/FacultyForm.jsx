import { React } from "react";
import { Form, Button } from "react-bootstrap";
import { XPAlertObj, XPInfoAlert, testThis } from "../../../utils/Common/xpAlerts";
import { formInit } from '../../../services/App/ListData/stationList';
import { useFacultyForm } from "./FacultyHook";
import { useDispatch, useSelector } from "react-redux";
import { addFaculty, editFaculty } from "../../../store/reducers/facultySlice";
import { getStoreFaculties, isFacultyValid } from "../../../store/reducers/selectors";
import { useFacultyController } from "../../../controllers/FacultyController";


export const FacultyForm = ({ onToggleModal, formObj }) => {
  const { form, handleValueChange, errors, setErrors, validateForm, initForm } = useFacultyForm({ formObj });

  const isValid = useSelector(isFacultyValid);
  const faculties = useSelector(getStoreFaculties);
  const { getAddFaculty, getEditFaculty } = useFacultyController(form);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();

    alertObj.icon = "success";

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }


  //   if(!isValid) {
  //     alertObj.icon = "warning";
  //     testThis(alertObj, "Duplucate Entry", "detected", onToggleModal());
  //     XPInfoAlert(alertObj)
  //     return;
  // }

      if(form.faculty_id > 0){
        getEditFaculty(form)
        // dispatch(editFaculty(form)); 
        testThis(alertObj, "Faculty", "edited", onToggleModal())
        XPInfoAlert(alertObj);
      } else{
        form.faculty_id = faculties.length + 1;
        getAddFaculty(form)
        // dispatch(addFaculty(form));
        testThis(alertObj, "Faculty", "added")
        XPInfoAlert(alertObj);
      }
      
    initForm(formInit);
  }

  return (
    <Form>
      {console.log("Form has rendered")}
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
