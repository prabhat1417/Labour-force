import Button from "./components/Button";
import Header from "./components/Header";
import "./styles.css";
import Homepage from "./pages/HomePage";
import Description from "./components/CategoryRow/Description";
import Login from './components/Authentication/login/login'
import SignUp from "./components/Authentication/signup/signup";
import {  Route, Routes } from 'react-router-dom'
import RegistrationForm from "./components/RegistrationForm/registration";
import Profile from "./components/Profile/profile";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  return (
    <div className="App">

      <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/description' element={<Description />} />
          <Route path='/registration' element={<RegistrationForm/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>

    </div>
  );
}
