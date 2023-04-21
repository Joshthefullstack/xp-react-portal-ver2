import React, { useState } from 'react';
import XPModal, { useXPModal } from '../../Common/XPModal';
import { cosformInit } from '../../../services/App/ListData/stationList';
import CourseOfStudyPriovider from '../CourseOfStudyItems/CourseOfStudyProvider';
import CourseOfStudyForm from '../CourseOfStudyItems/CourseOfStudyForm';
import CourseOfStudyGrid from '../CourseOfStudyItems/CourseOfStudyGrid';
import CourseOfStudyTable from '../CourseOfStudyItems/CourseOfStudyTable';


function CourseOfStudy() {
    const {show, toggleShow: onToggleModal} = useXPModal();
    const [modalTitle, setModalTitle] = useState("");
    const [form, setForm] = useState(cosformInit); 

    const onRequestModal = (courseOfStudy) => {
        setModalTitle(courseOfStudy ? "Update Course of Study" : "Add Course of Study");
        setForm(courseOfStudy ? courseOfStudy : cosformInit);
        onToggleModal();
    }

  return (
    <CourseOfStudyPriovider>
        <XPModal show={show} modalTitle={modalTitle} onClose={onToggleModal}>
            <CourseOfStudyForm formObj={form} onToggleModal={onToggleModal}/>
        </XPModal>
        <CourseOfStudyGrid onRequestModal={onRequestModal}>
            <CourseOfStudyTable onRequestModal={onRequestModal}/>
        </CourseOfStudyGrid>

    </CourseOfStudyPriovider>
  )
}


export default CourseOfStudy