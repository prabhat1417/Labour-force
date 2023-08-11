import Button from "./components/Button";
import Header from "./components/Header";
import "./styles.css";
import Homepage from "./pages/HomePage";
import Description from "./components/CategoryRow/Description";
import Login from './components/Authentication/login/login'
import SignUp from "./components/Authentication/signup/signup";
import {  Route, Routes } from 'react-router-dom'


export default function App() {
  return (
    <div className="App">

      <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/description' element={<Description />} />
        </Routes>

    </div>
  );
}
