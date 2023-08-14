import React, { useState, useEffect } from "react";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import "./index.css";
import Row from "../../components/CategoryRow/index";
import "bootstrap/dist/css/bootstrap.min.css";

const Homepage = (userInfo) => {
  const [searchInput, setSearchInput] = useState("");
  const handleInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    selectedCity = e.target[0].value;
    console.log(searchInput);
    console.log(selectedCity);
  };

  return (
    <>
      <div className="top">
        <Header userInfo={userInfo} />
        <div className="container">
          <div className="content">
            <p>Home / Ahmedabad</p>
            <h1 className="heading">Where we all converge, We are Labours</h1>
            {/* <button className="trapeziumButton">Hire Labourers</button> */}
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="wrapper">
                <div className="select">
                  <select className="" name="dropbox">
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Vadodara">Vadodara</option>
                  </select>
                </div>
              </div>
              <input
                className="search"
                type="text"
                placeholder="search for services"
                onChange={handleInput}
                value={searchInput}
              ></input>
            </form>
            <p>
              <a href="">Electrician</a>, <a href="">Plumber</a> etc.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <h2 className="profession-header">Electrician</h2>
        <Row userInfo={userInfo} category="Electrician" />
        <h2 className="profession-header">Plumber</h2>
        <Row userInfo={userInfo} category="Plumber" />
      </div>
      <Footer/>
    </>
  );
};

export default Homepage;
