import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginHomePage from './components/LoginHomePage';
import SignupHomePage from './components/SignupHomePage';
import ChatBox from './components/ChatBox';
// import ForgotPassword from './components/ForgotPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginHomePage/>} />
        <Route path="/login" element={<LoginHomePage/>} />
        <Route path="/signup" element={<SignupHomePage/>} />
        <Route path="/chat" element={<ChatBox/>} />
      </Routes>
    </Router>
  );
}


export default App;

