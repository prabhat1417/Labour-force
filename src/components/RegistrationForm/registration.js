import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Name: '',
    email: '',
    skills: [{ work: '', price: '' }],
    About: '',
    Aadharcard: '',
    category: '',
    city: '',
    MobileNo: '',
    Experience:'',
    customers: [],
  });
  const [errormsg, setErrorMsg] = useState('');
  const [check, setCheck] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setCheck(currentUser);
      } else {
        setCheck(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRegistration = async () => {
    if (!user.Name || !user.email || user.skills.some(skill => !skill.work || !skill.price) || !user.About || !user.Aadharcard || !user.category || !user.city || !user.MobileNo || !user.Experience) {
      setErrorMsg('Please fill all the required fields.');
      return; // Don't proceed with registration
    }
    try {
      const userDocRef = await addDoc(collection(db, 'memberships'), user);
      setErrorMsg('Registration successful!');
      setUser({
        Name: '',
        email: '',
        skills: [{ work: '', price: '' }],
        About: '',
        Aadharcard: '',
        category: '',
        city: '',
        MobileNo: '',
        customers: [],
      });
      console.log('Document written with ID: ', userDocRef.id);
      navigate('/');
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrorMsg('Registration failed. Please try again.');
    }
  };

  const handleSkillChange = (index, field, value) => {
    setUser((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index][field] = value;
      return { ...prev, skills: updatedSkills };
    });
  };

  const addSkill = () => {
    setUser((prev) => ({
      ...prev,
      skills: [...prev.skills, { work: '', price: '' }],
    }));
  };

  return (
    <div className="container mt-4 col-lg-6">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h1 className="text-center">Worker Registration Form</h1>
        </div>
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {check ? (
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your Name"
                      value={user.Name}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, Name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>
                  {user.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="mb-3">
                        <label
                          htmlFor={`skill-${index}`}
                          className="form-label"
                        >
                          Skill {index + 1}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`skill-${index}`}
                          placeholder="Enter skill"
                          value={skill.work}
                          onChange={(e) =>
                            handleSkillChange(index, 'work', e.target.value)
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor={`price-${index}`}
                          className="form-label"
                        >
                          Price for Skill {index + 1}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`price-${index}`}
                          placeholder="Enter price"
                          value={skill.price}
                          onChange={(e) =>
                            handleSkillChange(index, 'price', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    onClick={addSkill}
                  >
                    Add Skill
                  </button>
                  <div className="mb-3">
                    <label htmlFor="about" className="form-label">
                      About
                    </label>
                    <textarea
                      className="form-control"
                      id="about"
                      rows="3"
                      placeholder="Tell us about yourself"
                      value={user.About}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, About: e.target.value }))
                      }
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="aadharcard" className="form-label">
                      Aadharcard Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="aadharcard"
                      placeholder="Enter your Aadharcard number"
                      value={user.Aadharcard}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, Aadharcard: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      placeholder="Enter your category(eg:electrician,plumber)"
                      value={user.category}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, category: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter your city"
                      value={user.city}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, city: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobileNo" className="form-label">
                        Experience
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="experience"
                      placeholder="eg:1year,5year"
                      value={user.Experience}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, MobileNo: e.target.value }))
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobileNo" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobileNo"
                      placeholder="Enter your mobile number"
                      value={user.MobileNo}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, MobileNo: e.target.value }))
                      }
                    />
                  </div>
                  {errormsg && (
                    <b className="text-danger" style={{ textAlign: 'center', display: 'block' }}>
                      {errormsg}
                    </b>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleRegistration}
                  >
                    Register
                  </button>
                </form>
              ) : (
                <div>
                  <p>First sign in or login, please. After that, you will be able to register.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
