import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPopup from "./Components/LoginPopup";
import SignupPopup from "./Components/SignupPopup";
import Home from "./Components/Home";



function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPopup />} />
        <Route path="/login" element={<LoginPopup />} />
        
      </Routes>
    </Router>
  );
}

export default App;
