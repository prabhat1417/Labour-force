import React, { useEffect, useState } from "react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import LoginModal from "../../components/Authentication/Modal/loginmodal";
import SignUpModal from "../../components/Authentication/Modal/signupmodal";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleprofile = () => {
    navigate('/profile')  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentuser) => {
      if (currentuser) {
        handleLoginModalClose();
        handleSignUpModalClose();
        setUser(currentuser);
      }
      else{
        setUser(null)
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginModalShow = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleSignUpModalShow = () => {
    setShowSignUpModal(true);
  };

  const handleSignUpModalClose = () => {
    setShowSignUpModal(false);
  };

  return (
    <div className="header d-flex justify-content-between mb-4">
      <div className="logo">
        <h1 className="heading"><span style={{ color: "#f04800" }}>#</span>TheLabourForce</h1>
      </div>

      <div className="options">
        {!user ? (
          <div>
            <button className="btn btn-light" onClick={handleLoginModalShow}>
              Login
            </button>
            <button className="btn" style={{ color: "white", backgroundColor: "#f04800" }} onClick={handleSignUpModalShow}>
              Sign Up
            </button>
          </div>
        ) : (
          <button className="btn" style={{ color: "white", backgroundColor: "#f04800" }} onClick={handleprofile}>
            Profile
          </button>
        )}
      </div>   
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
      <SignUpModal show={showSignUpModal} handleClose={handleSignUpModalClose} />
    </div>
  );
}

export default Header;
