import React, { useState } from 'react';
import XPModal, { useXPModal } from '../../Common/XPModal';
import { courseformInit } from '../../../services/App/ListData/stationList';
import CoursePriovider from '../CourseItems/CourseProvider';
import CourseForm from '../CourseItems/CourseForm';
import CourseGrid from '../CourseItems/CourseGrid';
import CourseTable from '../CourseItems/CourseTable';


function Course() {
    const {show, toggleShow: onToggleModal} = useXPModal();
    const [modalTitle, setModalTitle] = useState("");
    const [form, setForm] = useState(courseformInit); 

    const onRequestModal = (course) => {
        setModalTitle(course ? "Update Course" : "Add Course");
        setForm(course ? course : courseformInit);
        onToggleModal();
    }

  return (
    <CoursePriovider>
        <XPModal show={show} modalTitle={modalTitle} onClose={onToggleModal}>
            <CourseForm formObj={form} onToggleModal={onToggleModal}/>
        </XPModal>
        <CourseGrid onRequestModal={onRequestModal}>
            <CourseTable onRequestModal={onRequestModal}/>
        </CourseGrid>
    </CoursePriovider>
  )
}


export default Course;