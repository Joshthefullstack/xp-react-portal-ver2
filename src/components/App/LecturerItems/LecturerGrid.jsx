import React from 'react';
import { Container, Button } from "react-bootstrap";
import AddButton from "../../Common/AddButton";


function LecturerGrid({ children, onRequestModal }) {
  return (
    <>
      <Container className="p-3">
          <h2 className="mb-3">Course</h2>
              <AddButton onRequestModal={onRequestModal} />
          { children }
      </Container>
    </>
  )
}

export default LecturerGrid;