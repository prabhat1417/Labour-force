import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import toast from "react-hot-toast";
import {db,auth } from "../../firebase";
import { collection, getDocs, query, updateDoc, where,doc} from "firebase/firestore";

const ProfileCardRow = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [customer,setCustomer]=useState(null);
  const user = props.userInfo.userInfo;
  const profession = props.category;
  const navigate = useNavigate();
  
  useEffect(() => {
    const delay = 2000;
    const timer = setTimeout(() => {
      setUserLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentuser) => {
      if (currentuser) {
        setCustomer(currentuser);
      } else {
        setCustomer(null);
      }
    });
    return () => unsubscribe(); // Call the unsubscribe function
  }, []);
  if (!userLoaded) {
    return null;
  }

  const handlebook = async (email) => {
    try {
      const membershipsRef = collection(db, "memberships");
      const querySnapshot = await getDocs(
        query(membershipsRef, where("email", "==", email))
      );
  
      if (!querySnapshot.empty) {
        const membershipsDocRef = doc(membershipsRef, querySnapshot.docs[0].id); // Get document reference
  
        const customers = querySnapshot.docs[0].data().customers || [];
  
        // Add the new customer object to the array
        customers.push({
          name: customer.displayName || "",
          email: customer.email || "",
          photourl: customer.photoURL || "",
        });
  
        // Update the document with the new customers array
        await updateDoc(membershipsDocRef, { customers });
        toast.success("Booking Successfull");
      } else {
        toast.success("Some error in Booking");
      }
    } catch (error) {
      console.error("Error updating membership document:", error);
    }
  };
  
  const filteredUsers = user.filter((profile) => profile.category === profession);
  return (
    <>
      <div className="profile-card-row">
        {filteredUsers.map((profile, index) => (
          <div className="row-card-container" key={index}>
            <header className="row-back">
              <img className="row-logo" src={'https://th.bing.com/th/id/R.2c2859b25e1c03d7cc4b660f8e4a8670?rik=bJNkrRGQp7Jmag&riu=http%3a%2f%2fridley-thomas.lacounty.gov%2fwp-content%2fuploads%2f2011%2f09%2fworkerProfile.jpg&ehk=JEm8d3VGp9kPnivrDYF4jhL%2by3Xu7RvF%2bzz1ZSw3Gas%3d&risl=&pid=ImgRaw&r=0'} alt={profile.name} />
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
              <button className="row-button row-button-right" onClick={()=>handlebook(profile.email)}>Book</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileCardRow;