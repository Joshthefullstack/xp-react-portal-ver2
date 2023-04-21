import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';
import { XPAlertObj, XPDeleteSuccessObj } from '../../../utils/Common/xpAlerts';
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useCosContext, useCosDispatchContext, useDepContext } from "./CourseOfStudyProvider";


const getGridHeader = () => {
    return (
        <tr>
            <th>S/N</th>
            <th>Department Name</th>
            <th>Course of Study Name</th>
            <th>Short Name</th>
            <th>UniqueId</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    );
};

const getGridData = ({ onDeleteClick, onRequestModal, deps, cos }) => {
  return cos.map((courseOfStudy, index)=>{
    const department = deps.find((department)=> department.department_id === courseOfStudy.department_id);
    return (
      <tr key={courseOfStudy.courseofstudy_id}>
        <td>{index + 1}</td>
        <td>{department.department_name}</td>
        <td>{courseOfStudy.courseofstudy_name}</td>
        <td>{courseOfStudy.courseofstudy_shortname}</td>
        <td>{courseOfStudy.courseofstudy_uniqueid}</td>
        <td>{courseOfStudy.courseofstudy_status ? "Active" : "Inactive"}</td>
        <td className='action_data'>
          <Button onClick={()=>{onRequestModal(courseOfStudy)}}><FaPen/>Edit</Button>
          <Button variant="danger" onClick={()=>{onDeleteClick(courseOfStudy)}}><FaTrash/>Delete</Button>
        </td>
      </tr>
    )
  })
}

function CourseOfStudyTable({ onRequestModal }) {
    
  const dispatch = useCosDispatchContext();
  const deps = useDepContext();
  const cos = useCosContext();

  const onDeleteClick = (courseOfStudy) => {
    const alertObj = XPAlertObj();
    alertObj.icon = "warning";
    alertObj.message = `Course Of Study Item: ${courseOfStudy.courseofstudy_name} would be deleted! Are you sure?`;
    alertObj.title = "Delete Confirmation";
    alertObj.callback = processDelete.bind(null, courseOfStudy);
    XPDeleteSuccessObj(alertObj)
  }

  const processDelete = (courseOfStudy) => {
    dispatch({ type: XPCrudType.byType(XPCrudType.Delete), cos: courseOfStudy })
  };

  return (
    <Table striped bordered hover>
        {/* {console.log("faculty table has rendered!")} */}
        <thead>{getGridHeader()}</thead>
        <tbody>
          {getGridData({ onDeleteClick, onRequestModal, deps, cos })}
        </tbody>
    </Table>
  )
};

export default CourseOfStudyTable;