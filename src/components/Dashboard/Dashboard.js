import React from 'react'
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div className='dashboard-profile'>
        <div className='profile-pic'>
            <div className='pic'>
            </div>
            <div className='upload-btn'>
                <button>Upload photo</button>
            </div>
        </div>

        <div className='box'>

            <div className='info'>
                <div className='title'>Your Name</div>
                <div className='text-value'>John Doe</div>
                <div className='title'>Email</div>
                <div className='text-value'>Johndoe@gmail.com</div>
                <div className='title'>Phone Number</div>
                <div className='text-value'>9876543218</div>
            </div>

        </div>

        <div className='box'>

            <div className='info'>
                <div className='text-value'>About <span className='name-style'>John</span></div>
                <div>Hey there! I'm John Doe, a curious and passionate individual on a journey to explore the realms of technology and creativity. With a background in computer science and a knack for problem-solving, I'm always excited to dive into new challenges and projects.</div>
            </div>

        </div>

        <div className='box'>

            <div className='info'>
                <div className='text-value'>Skills</div>
                <div className='text-value'>John Doe</div>
                <div className='title'>Email</div>
                <div className='text-value'>Johndoe@gmail.com</div>
                <div className='title'>Phone Number</div>
                <div className='text-value'>9876543218</div>
            </div>

        </div>

        </div>
    </div>
  )
}

export default Dashboard
