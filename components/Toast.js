import React from "react";
import { ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      autoClose={2000}
      position="bottom-center"
      pauseOnHover={true}
      draggable={true}
      theme="light"
      toastClassName="toast-custom"
    />
  );
};

export default Toast;
