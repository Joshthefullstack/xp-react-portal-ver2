import { React, useState } from "react";
import { Form } from "react-bootstrap";

export const useStateForm = ({ frm }) => {
  const [form, setForm] = useState(frm);
  const [errors, setErrors] = useState({});

  const handleValueChange = (e) => {
    if (e.target.type === "checkbox") {
      if (form[e.target.name] === false) {
        form[e.target.name] = true;
      } else if (form[e.target.name] === true) {
        form[e.target.name] = false;
      } else {
        form[e.target.name] = true;
      }
      setForm({ ...form });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
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

export const FacultyForm = ({ handleValueChange, form, errors }) => {

  return (
    <Form>
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
          checked={form.stat_active}
          onChange={(e) => {
            handleValueChange(e);
          }}
          label="Is Active?"
        />
      </Form.Group>
    </Form>
  );
};
