import React, { useEffect, useState } from 'react'
import './Dashboard.css';
import { auth } from '../../firebase';
import CustomerTable from './CustomerTable';

const Dashboard = ({userInfo}) => {

    const [currUser, setCurrUser] = useState(null);
    const [currWorker, setCurrWorker] = useState({});
    const [currEmail, setCurrEmail] = useState("");
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            
            if (user) {
                console.log(user);
                setCurrUser({
                    email: user.email,
                    displayName: user.displayName,
                    profile: user.photoURL,
                });
    
                setCurrEmail(user.email);
    
                const foundWorker = userInfo.find(worker => worker.email === user.email);
                if (foundWorker) {
                    foundWorker.customers = Array.from({ length: 10 }, (_, index) => `customer${index + 1}@example.com`);
                    setCurrWorker(foundWorker);
                }
            } else {
                setCurrUser(null);
            }
        });
            
        return () => unsubscribe();
    }, []);

    if(currUser?.customers) {
        console.log("currUser ", currUser);
    }

  return (
    <div className='dashboard'>
        <div className='dashboard-profile'>
            <div className='profile-pic'>
            {   currUser && 
                <div className='pic'>
                <img src={currUser.profile} alt="hii"/>
                </div>
            }
                
                <div className='upload-btn'>
                    <button className='btn btn-dark'>Upload photo</button>
                </div>
            </div>

            <div className='box'>

                <div className='info'>
                    <div className='text-value'>About <span className='name-style'>{currUser?.displayName}</span></div>
                    <div>Hey there! I'm John Doe, a curious and passionate individual on a journey to explore the realms of technology and creativity. With a background in computer science and a knack for problem-solving, I'm always excited to dive into new challenges and projects.</div>
                </div>

            </div>

            <div className='box'>

                <div className='info'>
                    <div className='title'>Your name</div>
                    { currUser && <div className='text-value'>{currUser.displayName}</div>}
                    <div className='title'>Email</div>
                    { currUser && <div className='text-value'>{currUser.email}</div>}
                    <div className='title'>Phone number</div>
                    { currWorker && <div className='text-value'>{currWorker.MobileNo}</div>}
                    <div className='title'>Aadhar card No.</div>
                    { currWorker && <div className='text-value'>{currWorker.Aadharcard}</div>}
                </div>

            </div>

            <div className='box'>
                <div className='info'>
                    <div className='text-value'>Skills</div>
                        {currWorker.skills && currWorker.skills.map((skill, index) => (
                            <div key={index} className='title'>
                                {skill.work} - {skill.price}
                            </div>
                        ))} 
                </div>
            </div>
            
        </div>
        <CustomerTable customers={currWorker.customers} />
    </div>
  )
}

export default Dashboard
