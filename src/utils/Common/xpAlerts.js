import Swal from "sweetalert2";

export const XPSucessObj = () => {
    Swal.fire(
        {
          title: "Item Added",
          text: "A Faculty was added successfully",
          icon: "success",
        }
      )
}

export const XPEditSuccessObj = () => {
    Swal.fire(
        {
          title: "Faculty Edited",
          text: "A Faculty was edited successfully",
          icon: "success",
        }
      )
}