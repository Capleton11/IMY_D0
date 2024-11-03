// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2>{title}</h2>
        {children}
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={onClose}>Cancel</button>
          <button style={buttonStyle} onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 15px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  margin: '5px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

export default Modal;
