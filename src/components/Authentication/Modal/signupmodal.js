import React, { useState } from "react";
import Modal from "react-bootstrap/Modal"; // Import Bootstrap Modal
import SignUp from "../signup/signup";

const SignUpModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignUp />
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
