import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ProfileCardRow = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const user = props.userInfo.userInfo;
  console.log(user);
  const profession = props.category;
  const navigate = useNavigate();
  useEffect(() => {
    const delay = 2000;
    const timer = setTimeout(() => {
      setUserLoaded(true);
    }, delay);

    return () => clearTimeout(timer);

  }, []);

  if (!userLoaded) {
    return null;
  }
  
  const filteredUsers = user.filter((profile) => profile.category === profession);
  return (
    <>
      <div className="profile-card-row">
        {filteredUsers.map((profile, index) => (
          <div className="row-card-container" key={index}>
            <header className="row-back">
              <img className="row-logo" src={'https://www.epicscotland.com/wp-content/uploads/2018/01/Business-Headshot_002.jpg'} alt={profile.name} />
            </header>
            <h1 className="row-bold-text">
              {profile.Name}
            </h1>
            <h2 className="row-normal-text">{profile.city}</h2>
            <div className="row-social-container">
              <div className="row-followers">
                <h1 className="row-bold-text">{profile.Experience[0]} years</h1>
                <h2 className="row-smaller-text">Experience</h2>
              </div>
              <div className="row-likes">
                <h1 className="row-bold-text">{profile.skills.length}</h1>
                <h2 className="row-smaller-text">Skills</h2>
              </div>
              <div className="row-photos">
                <h1 className="row-bold-text">{profile.skills[0].price}</h1>
                <h2 className="row-smaller-text">Price/h</h2>
              </div>

            </div>
            <div className="row-buttons">
            <button
                className="row-button row-button-left"
                onClick={() => navigate("/description", { state: { profile } })}
              >View</button>
              <button className="row-button row-button-right">Book</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileCardRow;
