import React, { memo }  from "react";
import { Container } from "react-bootstrap";
import AddButton from "../../Common/AddButton";

const FacultyGrid = ({ children, onRequestModal }) => {

  return (
    <>
    {console.log("Grid has rendered")}
      <Container className="p-3">
          <h2 className="mb-3">Faculty</h2>
              <AddButton onRequestModal={onRequestModal} />
          { children  }
      </Container>
    </>
  );
};

export default memo(FacultyGrid);
