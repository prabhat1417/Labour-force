import React from 'react';
import './index.css';
import image from '../../images/hero.png';
import Row from '../../components/CategoryRow/index';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = (userInfo) => {
  return (
    <div>
    <div className="container">
      <div className="row align-items-start">
        <div className="col-lg-6 col-md-12">
          <div className="content">
            <h1 className="heading">Where we all converge, We are Labours</h1>
            <p>Where we all converge, We are Labours</p>
            <button className="trapeziumButton">Hire Labourers</button>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="picture">
            <img src={image} alt="Picture" className="img-fluid custom-img" />
          </div>
        </div>
      </div>
    </div>
    <div className='row'>
    <h2 className="profession-header">Electrician</h2>
    <Row userInfo={userInfo} category="Electrician"/>
    <h2 className="profession-header">Plumber</h2>
    <Row userInfo={userInfo} category="Plumber"/>
    </div>
    <Footer />
    </div>
  );
};

export default Homepage;
