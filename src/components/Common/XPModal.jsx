import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';


export const useXPModal = () => {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);
    return { show, toggleShow }
}


function XPModal({
    show,
    onClose,
    modalTitle,
    children
}) {
  return (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
  )
}

export default XPModal