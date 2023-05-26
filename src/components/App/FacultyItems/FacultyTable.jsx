import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { XPAlertObj, XPDeleteSuccessObj } from '../../../utils/Common/xpAlerts';
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaculty } from '../../../store/reducers/facultySlice';
import { getStoreFaculties } from '../../../store/reducers/selectors';
import { useFacultyController } from '../../../controllers/FacultyController';


const getGridHeader = () => {
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

const getGridData = ({ onDeleteClick, onRequestModal, faculties }) => {
  return faculties.map((faculty, index)=>{
    return (
      <tr key={faculty.faculty_id}>
        <td>{index + 1}</td>
        <td>{faculty.faculty_name}</td>
        <td>{faculty.faculty_code}</td>
        <td>{faculty.faculty_uniqueid}</td>
        <td>{faculty.faculty_status ? "Active" : "Inactive"}</td>
        <td className='action_data'>
          <Button onClick={()=>{onRequestModal(faculty)}}><FaPen/>Edit</Button>
          <Button variant="danger" onClick={()=>{onDeleteClick(faculty)}}><FaTrash/>Delete</Button>
        </td>
      </tr>
    )
  })
}

function FacultyTable({ onRequestModal }) {
  const dispatch = useDispatch();
  const faculties = useSelector(getStoreFaculties);
  const { getDeleteFaculty } = useFacultyController();
  

  const onDeleteClick = (faculty) => {
    
    const alertObj = XPAlertObj();
    alertObj.icon = "warning";
    alertObj.message = `Faculty Item: ${faculty.faculty_name} would be deleted! Are you sure?`;
    alertObj.title = "Delete Confirmation";
    alertObj.callback = processDelete.bind(null, faculty);
    XPDeleteSuccessObj(alertObj)
  }

  const processDelete = (faculty) => {
    getDeleteFaculty(faculty)
  };

  return (
    <Table striped bordered hover>
      {console.log("Table has rendered")}
        <thead>{getGridHeader()}</thead>
        <tbody>
          {getGridData({ onDeleteClick, onRequestModal, faculties })}
        </tbody>
    </Table>
  )
};

export default FacultyTable;