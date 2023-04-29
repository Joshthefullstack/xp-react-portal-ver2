import Swal from "sweetalert2";

export const XPAlertObj = () => {
  return {
    title: "Item Added",
    message: "",
    icon: "",
    infoButText: "OK",
    confirmButText: "Yes, Proceeed",
    cancelButText: "No",
    redirecrUrl: "",
    callback: null
  }
}

export const XPInfoAlert = (alertObj) => {
  Swal.fire({
    title: `${alertObj.title}`,
    text: `${alertObj.message}`,
    icon: `${alertObj.icon}`,
    confirmButtonText: `${alertObj.infoButText}`
  }).then(()=>{
    if (alertObj.redirecrUrl.length > 0){
      window.location.href = alertObj.redirecrUrl;
    }
    if(typeof alertObj.callback === "function"){
      alertObj.callback();
    }
  })
}

export const XPDeleteSuccessObj = (alertObj) => {
  Swal.fire({
    title: `${alertObj.title}`,
    text: `${alertObj.message}`,
    icon: `${alertObj.icon}`,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `${alertObj.confirmButText}`
  }).then((result) => {
    if (result.isConfirmed && typeof alertObj.callback === "function") {
      alertObj.callback();
    }
  })
}

export const testThis = (alertObj, item, action, callback) =>  {
  alertObj.message = item + " was " + action + " successfully" ;
  alertObj.title = item + " was " + action;
  alertObj.callback = callback;
}