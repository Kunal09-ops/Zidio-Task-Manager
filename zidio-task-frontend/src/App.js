import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import Careers from "./pages/Careers";
import Services from "./pages/Services";
import Login from "./components/Login";
import Register from "./components/Register";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/navbar";
import MeetingRoom from './pages/MeetingRoom';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main className="container mx-auto">{children}</main>
      {location.pathname !== '/meeting' && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Navbar/>
        {/* <Header /> */}
        
        
        <main className="container mx-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            {/* <Route path="/careers" element={<Careers />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/meeting" element={<MeetingRoom />} />
            
          </Routes>
               
        </main>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
};

export default App;
