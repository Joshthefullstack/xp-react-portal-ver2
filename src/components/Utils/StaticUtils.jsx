import React from "react";
import { XPCrudType } from "../../utils/Common/Enums/alertEnums" 
import { Button } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export const getFacultyGridHeader = () => {
  return (
    <tr>
      <th>S/N</th>
      <th>Faculty Name</th>
      <th>Code</th>
      <th>UniqueId</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  );
};

export const getFacultyGridBody = (faculties, editFaculty, onFacultyChange) => {
  return faculties.map((value, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{value.faculty_name}</td>
      <td>{value.faculty_code}</td>
      <td>{value.faculty_uniqueid}</td>
      <td>{value.faculty_status ? "Active" : "Inactive"}</td>
      <td className="action_data">
        <Button onClick={()=>{editFaculty(value)}}>
          <FaPen /> Edit
        </Button>
        <Button variant="danger" onClick={()=>{onFacultyChange(value, XPCrudType.Delete)}}>
          <FaTrash/> Delete
        </Button>
      </td>
    </tr>
  ));
};
