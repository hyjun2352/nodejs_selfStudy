import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  // export default Auth( LandingPage, null ); 이것도 가능
  const NewLandingPage  = Auth(LandingPage , null);
  const NewLoginPage  = Auth(LoginPage , false);
  const NewRegisterPage  = Auth(RegisterPage , false);

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element = {<NewLandingPage />} />
          <Route exact path="/login" element = {<NewLoginPage />} />
          <Route exact path="/register" element = {<NewRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;