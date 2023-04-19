import React from 'react';
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

function AddButton({addFaculty, onRequestModal}) {
  return (
    <div className="col-md-12 text-end mb-3">
        <Button variant="info" onClick={()=>{onRequestModal()}}>
        <FaPlus/> Add
        </Button>
    </div>
  )
}

export default AddButton;