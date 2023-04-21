import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';
import { XPAlertObj, XPDeleteSuccessObj } from '../../../utils/Common/xpAlerts';
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useLecturerContext, useLecturerDispatchContext, useDepContext } from "./LecturerProvider";


const getGridHeader = () => {
    return (
        <tr>
            <th>S/N</th>
            <th>Department Name</th>
            <th>First Name</th>
            <th>Other Name</th>
            <th>Staff Id</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    );
};

const getGridData = ({ onDeleteClick, onRequestModal, deps, lecturer }) => {
  return lecturer.map((lecturer, index)=>{
    const department = deps.find((department)=> department.department_id === lecturer.department_id);
    return (
      <tr key={lecturer.lecturer_id}>
        <td>{index + 1}</td>
        <td>{department.department_name}</td>
        <td>{lecturer.lecturer_firstname}</td>
        <td>{lecturer.lecturer_othername}</td>
        <td>{lecturer.lecturer_staffid}</td>
        <td>{lecturer.lecturer_status ? "Active" : "Inactive"}</td>
        <td className='action_data'>
          <Button onClick={()=>{onRequestModal(lecturer)}}><FaPen/>Edit</Button>
          <Button variant="danger" onClick={()=>{onDeleteClick(lecturer)}}><FaTrash/>Delete</Button>
        </td>
      </tr>
    )
  })
}

function LecturerTable({ onRequestModal }) {
    
  const dispatch = useLecturerDispatchContext();
  const deps = useDepContext();
  const lecturer = useLecturerContext();

  const onDeleteClick = (lecturer) => {
    const alertObj = XPAlertObj();
    alertObj.icon = "warning";
    alertObj.message = `Lecturer Item: ${lecturer.lecturer_surname} ${lecturer.lecturer_firstname} would be deleted! Are you sure?`;
    alertObj.title = "Delete Confirmation";
    alertObj.callback = processDelete.bind(null, lecturer);
    XPDeleteSuccessObj(alertObj)
  }

  const processDelete = (lecturer) => {
    dispatch({ type: XPCrudType.byType(XPCrudType.Delete), lecturer: lecturer })
  };

  return (
    <Table striped bordered hover>
        {/* {console.log("faculty table has rendered!")} */}
        <thead>{getGridHeader()}</thead>
        <tbody>
          {getGridData({ onDeleteClick, onRequestModal, deps, lecturer })}
        </tbody>
    </Table>
  )
};

export default LecturerTable;