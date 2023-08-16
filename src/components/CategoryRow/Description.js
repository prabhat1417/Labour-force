import React,{useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {db,auth } from "../../firebase";
import { collection, getDocs, query, updateDoc, where,doc} from "firebase/firestore";
import Header from "../Header";
import Footer from "../Footer";

const Description = () => {
    const [customer,setCustomer]=useState(null);
    const location = useLocation();
    const profile = location.state.profile;
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

    return (
      <>
      <Header />
        <div className='dashboard'>
            <div className='dashboard-profile'>
                <div className='profile-pic'>
                    <div className='pic'>
                        <img style={{ width: '150px' }} src={'https://www.epicscotland.com/wp-content/uploads/2018/01/Business-Headshot_002.jpg'} alt="hii" />
                    </div>
                    <button className="btn btn-dark" onClick={()=>handlebook(profile.email)}>Book Now</button>
                </div>
                <div className='box'>
                    <div className='info'>
                        <div className='text-value'>About <span className='name-style'>{profile.Name}</span></div>
                        <div>{profile.About}</div>
                    </div>

                </div>

                <div className='box'>

                    <div className='info'>
                        <div className='title'>Name</div>
                        <div className='text-value'>{profile.Name}</div>
                        <div className='title'>Email</div>
                        <div className='text-value'>{profile.email}</div>
                        <div className='title'>Phone</div>
                        <div className='text-value'>{profile.MobileNo}</div>

                        <div className='title'>City</div>
                        <div className='text-value'>{profile.city}</div>

                    </div>

                </div>

                <div className='box'>
                    <div className='info'>
                        <div className='text-value'>Profession</div>
                        <p>{profile.category}</p>
                        <div className='text-value'>Skills</div>
                        {profile.skills.map((skill, index) => (
                            <div key={index} className='title'>
                                {skill.work} - {skill.price}
                            </div>
                        ))}
                        <div className='text-value'>Experience</div>
                        <p>{profile.Experience[0]} years</p>
                    </div>
                </div>

            </div>

        </div>
        <Footer />
        </>
    )
}

export default Description;
