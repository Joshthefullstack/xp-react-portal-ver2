import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';
import { XPAlertObj, XPDeleteSuccessObj } from '../../../utils/Common/xpAlerts';
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useDepContext } from "./DepartmentProvider";
import { useFacContext } from "./DepartmentProvider";
import { useDepDispatchContext } from "./DepartmentProvider";


const getGridHeader = () => {
    return (
        <tr>
            <th>S/N</th>
            <th>Faculty Name</th>
            <th>Department Name</th>
            <th>Code</th>
            <th>UniqueId</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    );
};

const getGridData = ({ onDeleteClick, onRequestModal, deps, facs }) => {
  return deps.map((department, index)=>{
    const faculty = facs.find((faculty)=> department.faculty_id === faculty.faculty_id);
    return (
      <tr key={department.department_id}>
        <td>{index + 1}</td>
        <td>{faculty.faculty_name}</td>
        <td>{department.department_name}</td>
        <td>{department.department_code}</td>
        <td>{department.department_uniqueid}</td>
        <td>{department.department_status ? "Active" : "Inactive"}</td>
        <td className='action_data'>
          <Button onClick={()=>{onRequestModal(department)}}><FaPen/>Edit</Button>
          <Button variant="danger" onClick={()=>{onDeleteClick(department)}}><FaTrash/>Delete</Button>
        </td>
      </tr>
    )
  })
}

function DepartmentTable({ onRequestModal }) {
    
  const dispatch = useDepDispatchContext();
  const deps = useDepContext();
  const facs = useFacContext();

  const onDeleteClick = (department) => {
    const alertObj = XPAlertObj();
    alertObj.icon = "warning";
    alertObj.message = `Department Item: ${department.department_name} would be deleted! Are you sure?`;
    alertObj.title = "Delete Confirmation";
    alertObj.callback = processDelete.bind(null, department);
    XPDeleteSuccessObj(alertObj)
  }

  const processDelete = (department) => {
    dispatch({ type: XPCrudType.byType(XPCrudType.Delete), dep: department })
  };

  return (
    <Table striped bordered hover>
        {/* {console.log("faculty table has rendered!")} */}
        <thead>{getGridHeader()}</thead>
        <tbody>
          {getGridData({ onDeleteClick, onRequestModal, deps, facs })}
        </tbody>
    </Table>
  )
};

export default DepartmentTable;