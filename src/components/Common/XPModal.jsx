import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function XPModal({
    show,
    handleShow,
    handleClose,
    facultyForm,
    modalTitle,
    submitForm
}) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{facultyForm}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default XPModal