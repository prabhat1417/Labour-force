import React, { useState } from "react";
import Modal from "react-bootstrap/Modal"; // Import Bootstrap Modal
import Login from "../login/login";

const LoginModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login />
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
