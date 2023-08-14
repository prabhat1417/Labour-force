import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faEnvelope } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons';
import './index.css';
const Footer = () => {
  return (
    <footer id="footer">
      <FontAwesomeIcon icon={faFacebook} className="footer-icon" />
      <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
      <FontAwesomeIcon icon={faTwitter} className="footer-icon" />
      <FontAwesomeIcon icon={faEnvelopeSolid} className="footer-icon" />
      <p>© Copyright 2023 <span className='company'>#THE LABOUR FORCE</span> </p>
    </footer>
  );
};

export default Footer;
