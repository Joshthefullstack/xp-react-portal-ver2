import React, { useState } from 'react'
import FacultyTable from "../FacultyItems/FacultyTable";
import FacultyGrid from "../FacultyItems/FacultyGrid";
import { FacultyForm }  from '../FacultyItems/FacultyForm';
import XPModal, { useXPModal } from '../../Common/XPModal';
import { formInit } from '../../../services/App/ListData/stationList';
import FacultyProvider from '../FacultyItems/FacultyProvider';

function Faculty() {
    const {show, toggleShow: onToggleModal} = useXPModal();
    const [modalTitle, setModalTitle] = useState("");
    const [form, setForm] = useState(formInit);
    

    const onRequestModal = (faculty) => {
        setModalTitle(faculty ? "Update Faculty" : "Add Faculty");
        setForm(faculty ? faculty : formInit);
        onToggleModal();
    }

  return (
    <FacultyProvider>
      <XPModal show={show} modalTitle={modalTitle} onClose={onToggleModal}>
          <FacultyForm onToggleModal={onToggleModal} formObj={form} />
      </XPModal>
      <FacultyGrid onRequestModal={onRequestModal}>     
          <FacultyTable onRequestModal={onRequestModal} />
      </FacultyGrid>
    </FacultyProvider>
  )
}

export default Faculty;
