import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { XPCrudType } from '../../../utils/Common/Enums/alertEnums';
import { XPAlertObj, XPDeleteSuccessObj } from '../../../utils/Common/xpAlerts';
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useCourseContext, useCourseDispatchContext, useDepContext } from "./CourseProvider";


const getGridHeader = () => {
    return (
        <tr>
            <th>S/N</th>
            <th>Department Name</th>
            <th>Course Name</th>
            <th>Code</th>
            <th>UniqueId</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    );
};

const getGridData = ({ onDeleteClick, onRequestModal, deps, course }) => {
  return course.map((course, index)=>{
    const department = deps.find((department)=> department.department_id === course.department_id);
    return (
      <tr key={course.course_id}>
        <td>{index + 1}</td>
        <td>{department.department_name}</td>
        <td>{course.course_name}</td>
        <td>{course.course_code}</td>
        <td>{course.course_uniqueid}</td>
        <td>{course.course_status ? "Active" : "Inactive"}</td>
        <td className='action_data'>
          <Button onClick={()=>{onRequestModal(course)}}><FaPen/>Edit</Button>
          <Button variant="danger" onClick={()=>{onDeleteClick(course)}}><FaTrash/>Delete</Button>
        </td>
      </tr>
    )
  })
}

function CourseTable({ onRequestModal }) {
    
  const dispatch = useCourseDispatchContext();
  const deps = useDepContext();
  const course = useCourseContext();

  const onDeleteClick = (course) => {
    const alertObj = XPAlertObj();
    alertObj.icon = "warning";
    alertObj.message = `Course Item: ${course.course_name} would be deleted! Are you sure?`;
    alertObj.title = "Delete Confirmation";
    alertObj.callback = processDelete.bind(null, course);
    XPDeleteSuccessObj(alertObj)
  }

  const processDelete = (course) => {
    dispatch({ type: XPCrudType.byType(XPCrudType.Delete), course: course })
  };

  return (
    <Table striped bordered hover>
        {/* {console.log("faculty table has rendered!")} */}
        <thead>{getGridHeader()}</thead>
        <tbody>
          {getGridData({ onDeleteClick, onRequestModal, deps, course })}
        </tbody>
    </Table>
  )
};

export default CourseTable;