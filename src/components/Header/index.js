import React, { useEffect, useState } from "react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import LoginModal from "../../components/Authentication/Modal/loginmodal";
import SignUpModal from "../../components/Authentication/Modal/signupmodal";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Header(userInfo) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isWorker, setIsWorker] = useState(false);
  const [isMembershipChecked, setIsMembershipChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        handleLoginModalClose();
        handleSignUpModalClose();
        setUser(currentUser);
        setIsWorker(true);
        const membershipCollectionRef = collection(db, 'memberships');
        const querySnapshot = await getDocs(
          query(membershipCollectionRef, where("email", "==", currentUser.email))
        );
        setIsWorker(!querySnapshot.empty);
        setIsMembershipChecked(true);
      } else {
        setUser(null);
        setIsWorker(false);
        setIsMembershipChecked(true);
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

  // console.log(userInfo);

  return (
    <div className="header d-flex justify-content-between mb-4">
      <div className="logo">
      <NavLink to='/' style={{ textDecoration: 'none', color: 'black' }}>
        <h1 className="heading">
          <span style={{ color: '#f04800' }}>#</span>
          <span>TheLabourForce</span>
        </h1>
      </NavLink>

      </div>
      <div className="options">
        {!user? (
          <div>
            <button className="btn btn-light" onClick={handleLoginModalShow}>
              Login
            </button>
            <button className="btn" style={{ color: "white", backgroundColor: "#f04800" }} onClick={handleSignUpModalShow}>
              Sign Up
            </button>
          </div>
        ) : (
          <div>
            <button className="btn" style={{ color: "white", backgroundColor: "#f04800" }} onClick={() => navigate('/profile')}>
              Profile
            </button>
            {isMembershipChecked ? (
              isWorker ?
              <NavLink to='/dashboard'>
                <button className="btn btn-dark">
                  Dashboard
                </button>
                </NavLink>
              :
                <button className="btn btn-dark" onClick={() => navigate('/registration')}>
                  Register As A Professional
                </button>
            ) : (
              <button className="btn btn-light" disabled>
                Checking...
              </button>
            )}
          </div>
        )}
      </div>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
      <SignUpModal show={showSignUpModal} handleClose={handleSignUpModalClose} />
    </div>
  );
}

export default Header;