import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, where, query } from "firebase/firestore";
import Cookies from "js-cookie";


const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserInfo({
          email: user.email,
          displayName: user.displayName,
        });

        const websitesCollectionRef = collection(db, "membership");
        try {
          const querySnapshot = await getDocs(
            query(websitesCollectionRef, where("User", "==", user.email))
          );

          if (!querySnapshot.empty) {
            const websiteData = querySnapshot.docs[0].data();
            setCurrentPlan(websiteData);
          }
        } catch (error) {
          console.error("Error checking user plan status:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserInfo(null);
        setCurrentPlan(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        Cookies.remove("shownAlert");
        navigate("/");
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <h1>User Profile</h1>
              </div>
              <div className="card-body">
                {userInfo ? (
                  <div>
                    {userInfo.displayName && (
                      <p>Name: {userInfo.displayName}</p>
                    )}
                    {userInfo.email && <p>Email: {userInfo.email}</p>}
                    {currentPlan && currentPlan.Status && (
                      <p>Status: {currentPlan.Status}</p>
                    )}
                    {currentPlan && currentPlan["Destination-Hosting"] && (
                      <p>
                        Destination Hosting:{" "}
                        <a
                          href={currentPlan["Destination-Hosting"]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {currentPlan["Destination-Hosting"]}
                        </a>
                      </p>
                    )}
                    {currentPlan && currentPlan["Google drive"] && (
                      <p>
                        Google Drive:{" "}
                        <a
                          href={currentPlan["Google drive"]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {currentPlan["Google drive"]}
                        </a>
                      </p>
                    )}

                    {currentPlan && currentPlan["Github deployment"] && (
                      <p>
                        Github Deployment:{" "}
                        <a
                          href={currentPlan["Github deployment"]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {currentPlan["Github deployment"]}
                        </a>
                      </p>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="btn btn-danger mt-3"
                    >
                      Log Out
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
