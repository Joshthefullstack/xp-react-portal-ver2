import React from 'react';
import { Container, Button } from "react-bootstrap";
import AddButton from "../../Common/AddButton";


function CourseOfStudyGrid({ children, onRequestModal }) {
  return (
    <>
      <Container className="p-3">
          <h2 className="mb-3">Course of Study</h2>
              <AddButton onRequestModal={onRequestModal} />
          { children }
      </Container>
    </>
  )
}

export default CourseOfStudyGrid