import { React, useState } from "react";
import XPModal from "../Common/XPModal";
import { getAllFaculties, formInit, toFormVal, addFaculties, editFaculties, deleteFaculties } from "../../services/App/ListData/stationList";
import { useStateForm, FacultyForm } from "./Form/FacultyForm";
import { getFacultyGridHeader, getFacultyGridBody } from '../Utils/StaticUtils';
import { XPSucessObj, XPEditSuccessObj } from "../../utils/Common/xpAlerts"
import { Table, Container } from "react-bootstrap";
import AddButton from "../Common/AddButton";

const FacultyGrid = () => {
  const [faculties, setFaculties] = useState(getAllFaculties);
  let [facult, setFacult] = useState({})

  const [modalTitle, setModalTitle] = useState("Add Faculties")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { handleValueChange, form, initForm, validateForm, errors, setErrors } = useStateForm({frm: formInit})

  const onSubmitFaculty = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    if(form.faculty_status){
      form.faculty_status = 1
    } else{
      form.faculty_status = 0
    }

    if(form.faculty_id > 0){
      editFaculties(facult, setFacult, faculties, form);
      XPEditSuccessObj()
    } else{
      addFaculties(form, faculties)
      XPSucessObj()
    }
    initForm(formInit);
    handleClose();
  }

  const editFaculty = (faculty) => {
    handleShow();
    initForm(toFormVal(faculty));
    setModalTitle("Edit Faculties")
  }

  const addFaculty = () => {
    handleShow();
    initForm(formInit)
    setModalTitle("Add Faculties")
  }

  const deleteFaculty = (faculty) => {
    deleteFaculties(faculty, faculties, facult, setFacult)
  }

  return (
    <>
    <Container className="p-3">
    <XPModal show={show} handleClose={handleClose} handleShow={handleShow} facultyForm={<FacultyForm handleValueChange={handleValueChange} errors={errors} form={form}/>} modalTitle={modalTitle} submitForm={onSubmitFaculty}/>
    <h2 className="mb-3">Faculty</h2>
    <AddButton addFaculty={addFaculty}/>
      <Table bordered striped>
        <thead>
          {getFacultyGridHeader()}
        </thead>
        <tbody>
          {getFacultyGridBody(faculties, editFaculty, deleteFaculty)}
        </tbody>
      </Table>
    </Container>
    </>
  );
};

export default FacultyGrid;
