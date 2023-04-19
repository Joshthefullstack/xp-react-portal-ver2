import React, { useState } from 'react';
import XPModal, { useXPModal } from '../../Common/XPModal';
import { depsformInit } from '../../../services/App/ListData/stationList';
import DepartmentProvider from '../DepartmentItems/DepartmentProvider';
import DepartmentForm from '../Form/DepartmentForm';
import DepartmentGrid from '../DepartmentItems/DepartmentGrid';
import DepartmentTable from '../Table/DepartmentTable';


function Department() {
    const {show, toggleShow: onToggleModal} = useXPModal();
    const [modalTitle, setModalTitle] = useState("");
    const [form, setForm] = useState(depsformInit); 

    const onRequestModal = (department) => {
        setModalTitle(department ? "Update Department" : "Add Department");
        setForm(department ? department : depsformInit);
        onToggleModal();
    }

  return (
    <DepartmentProvider>
        <XPModal show={show} modalTitle={modalTitle} onClose={onToggleModal}>
            <DepartmentForm formObj={form} onToggleModal={onToggleModal}/>
        </XPModal>
        <DepartmentGrid onRequestModal={onRequestModal}>
            <DepartmentTable onRequestModal={onRequestModal}/>
        </DepartmentGrid>

    </DepartmentProvider>
  )
}


export default Department