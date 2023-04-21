import React, { useState } from 'react';
import XPModal, { useXPModal } from '../../Common/XPModal';
import { lecturerformInit } from '../../../services/App/ListData/stationList';
import LecturerProvider from '../LecturerItems/LecturerProvider';
import LecturerForm from '../LecturerItems/LecturerForm';
import LecturerGrid from '../LecturerItems/LecturerGrid';
import LecturerTable from '../LecturerItems/LecturerTable';


function Lecturer() {
    const {show, toggleShow: onToggleModal} = useXPModal();
    const [modalTitle, setModalTitle] = useState("");
    const [form, setForm] = useState(lecturerformInit); 

    const onRequestModal = (lecturer) => {
        setModalTitle(lecturer ? "Update Lecturer" : "Add Lecturer");
        setForm(lecturer ? lecturer : lecturerformInit);
        onToggleModal();
    }

  return (
    <LecturerProvider>
        <XPModal show={show} modalTitle={modalTitle} onClose={onToggleModal}>
            <LecturerForm formObj={form} onToggleModal={onToggleModal}/>
        </XPModal>
        <LecturerGrid onRequestModal={onRequestModal}>
            <LecturerTable onRequestModal={onRequestModal}/>
        </LecturerGrid>
    </LecturerProvider>
  )
}


export default Lecturer;