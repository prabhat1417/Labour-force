import React, { useState } from "react";
import { toast } from "react-hot-toast";
import InputControl from "../inputControll/inputcontrol";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../firebase";
import SignUpModal from "../Modal/signupmodal";

const Login = () => {

  const navigate = useNavigate();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const handleLogin = async () => {
    try {
      const email = user.email;
      const password = user.password;
      await auth.signInWithEmailAndPassword(email, password);
      closeSignUpModal();
      toast.success("Sussessfully Logged in");
      navigate('/')
    }
    catch (error) {
      toast.error(error.message);
    }

  }

  const redirectToSignup = () => {
    setShowSignUpModal(true);
  }

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">


        <InputControl
          type="email"
          label="Email:"
          placeholder="Enter your email"
          onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
        />
        <InputControl
          type="password"
          label="Password:"
          placeholder="Enter your password"
          onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
        />
        {errormsg && <b className="signup_error" style={{
          color: "red", textalign: "center"
        }}>{errormsg}</b>}

        <button className="btn btn-primary btn-block mt-4" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center mt-3 mb-0">
          Create an account?{" "}
          <span className="text-primary" >
            Signup
          </span>
        </p>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal show={showSignUpModal} handleClose={closeSignUpModal} />
    </div>
  );
};

export default Login;
