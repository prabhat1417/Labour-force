import React,{useEffect,useState} from "react";
import "./index.css";

const ProfileCardRow = (userInfo) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const user = userInfo.userInfo.userInfo;
  console.log(user);
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
  return (
    <>
    <div className="profile-card-row">
      {user.map((profile,index) => (
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
              <h1 className="row-bold-text">{profile.Experience}</h1>
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
        </div>
      ))}
    </div>
    </>
  );
}

export default ProfileCardRow;
