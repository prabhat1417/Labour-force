import React from "react";
import { useLocation } from "react-router-dom";

const Description = () => {
  const location = useLocation();
  const profile = location.state.profile;
  console.log(profile);
  return (
    <div className='dashboard'>
        <div className='dashboard-profile'>
            <div className='profile-pic'>
                <div className='pic'>
                <img style={{width: '150px'}} src={'https://www.epicscotland.com/wp-content/uploads/2018/01/Business-Headshot_002.jpg'} alt="hii"/>
                </div>
                <button className="btn btn-dark">Book Now</button>
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
  )
}

export default Description;
