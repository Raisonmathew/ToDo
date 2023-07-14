import React from "react";
import Modal from "../modal/modal";

const ModalConfirm = ({ onConfirm, onClose, text }) => {
  const confirmAndCloseModal = () => {
    onConfirm();
    onClose();
  };
  return (
    <Modal onClose={onClose} title="Are you sure?">
      <p className="text-slate-500">{text}</p>
      <div className="mt-7 ml-auto">
        <button className="px-4 py-1 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full" onClick={onClose}>Cancel</button>
        <button className="px-4 py-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full" onClick={confirmAndCloseModal}>
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;