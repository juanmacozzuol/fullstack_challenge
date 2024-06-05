import React from 'react';
import { useEffect } from 'react';
const Modal = ({ isOpen, onClose, internal }) => {

    useEffect(() => {
        if (isOpen) {
          // Scroll to the bottom of the page when the modal opens
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }, [isOpen]);
  if (!isOpen) {
    return null;
  }

  

  return (
    <div className="modal">
      <div className="modal-content">

        <button className="close" onClick={onClose}>&times;</button>
        {internal}
        </div>

    </div>
  );
};

export default Modal;
