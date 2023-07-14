import React from "react";
import { createPortal } from "react-dom";

const ModalContent = ({ children, onClose, title }) => {
  const closeModalHandler = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={closeModalHandler}>
      <div className="relative bg-slate-200 max-w-lg w-full rounded-lg p-3 sm:p-5 flex flex-col justify-start dark:bg-slate-900">
        <div className="border-0 p-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
            {title}
            </h3>
            <button className="absolute right-3 top-5 sm:right-4 p-1 ml-auto bg-transparent border-0 text-black opacity-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}>
              <span className="">
                ×
              </span>
            </button>
          </div>
        {children}
        </div>
      </div>
    </div> 
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

const modalElement = document.getElementById("modal");

const Modal = ({ children, onClose, title }) => {
  return createPortal(
    <ModalContent children={children} onClose={onClose} title={title} />,
    modalElement
  );
};

export default Modal;