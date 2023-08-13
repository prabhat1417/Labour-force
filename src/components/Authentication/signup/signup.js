import React, { useState } from "react";
import InputControl from "../inputControll/inputcontrol";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import LoginModal from "../Modal/loginmodal";


const SignUp = () => {

    const navigate = useNavigate();
    const [errormsg, setErrormsg] = useState("");
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleSignIn = () => {
        if (!value.name || !value.email || !value.password) {
            setErrormsg("Fill in all fields");
        } else {
            createUserWithEmailAndPassword(auth, value.email, value.password)
                .then((res) => {
                    // console.log(res);
                    const user = res.user;
                    updateProfile(user, {
                        displayName: value.name,
                    });

                    setValue({
                        name:value.name,
                        email: value.email,
                        password: value.password,
                    });

                    navigate("/");
                })
                .catch((error) => {
                    // console.log('Error creating user:', error.message);
                    setErrormsg(error.message);

                    if (error.code === "auth/email-already-in-use") {
                        // User is already registered, redirect to login page
                        // navigate('/login');
                        setErrormsg(error.message);
                    }
                });
        }
    }

    const signWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const signWithFacebook = () => {
        console.log("Sign in with Facebook")
        // Implement your Facebook sign-in logic here
    }

    const redirectToLogin = () => {
       setShowSignUpModal(true);
    }
    const closeSignUpModal = () => {
        setShowSignUpModal(false);
      }
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">

                <InputControl
                    type="text"
                    label="Name:"
                    placeholder="Enter your Name"
                    onChange={(e) =>
                        setValue((prev) => ({ ...prev, name: e.target.value }))
                    }
                    value={value.name}
                />
                <InputControl
                    type="email"
                    label="Email:"
                    placeholder="Enter your email"
                    onChange={(e) =>
                        setValue((prev) => ({ ...prev, email: e.target.value }))
                    }
                    value={value.email}
                />
                <InputControl
                    type="password"
                    label="Password:"
                    placeholder="Enter your password"
                    onChange={(e) =>
                        setValue((prev) => ({ ...prev, password: e.target.value }))
                    }
                    value={value.password}
                />

                <div className="d-flex justify-content-between m-6">
                    <button className="btn btn-light m-1" onClick={signWithGoogle}>
                        <FaGoogle size={20} />
                        Sign in with Google
                    </button>
                    <button className="btn btn-primary m-1" onClick={signWithFacebook}>
                        <FaFacebook size={20} />
                        Sign in with Facebook
                    </button>
                </div>


                {errormsg && <b className="signup_error" style={{
                    color: "red", textalign: "center"
                }}>{errormsg}</b>}

                <button className="btn btn-primary btn-block mt-4" onClick={handleSignIn}>
                    Signup
                </button>
                <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <span className="text-primary">
                        Login
                    </span>
                </p>
            </div>
                  {/* Sign Up Modal */}
      <LoginModal show={showSignUpModal} handleClose={closeSignUpModal} />
        </div>
    );
};

export default SignUp;
