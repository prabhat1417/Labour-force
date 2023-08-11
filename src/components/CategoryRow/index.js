import React from "react";
import "./index.css";
import dummyData from "./dummy.json";

function ProfileCardRow() {
  return (
    <>
    <div className="profile-card-row">
      {dummyData.map((profile) => (
        <div className="row-card-container" key={profile.name}>
          <header className="row-back">
            <img className="row-logo" src={'https://www.epicscotland.com/wp-content/uploads/2018/01/Business-Headshot_002.jpg'} alt={profile.name} />
          </header>
          <h1 className="row-bold-text">
            {profile.name}
          </h1>
          <h2 className="row-normal-text">{profile.profession}</h2>
          <div className="row-social-container">
            <div className="row-followers">
              <h1 className="row-bold-text">{profile.rating}</h1>
              <h2 className="row-smaller-text">Ratings</h2>
            </div>
            <div className="row-likes">
              <h1 className="row-bold-text">{profile.skills.length}</h1>
              <h2 className="row-smaller-text">Skills</h2>
            </div>
            <div className="row-photos">
              <h1 className="row-bold-text">{profile.price}</h1>
              <h2 className="row-smaller-text">Price/h</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default ProfileCardRow;
