// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import React ,{ useContext } from 'react';
// // import React, { useState, useEffect } from "react";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// // import Careers from "./pages/Careers";
// import Services from "./pages/Services";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Auth from "./components/Auth";
// import Dashboard from "./components/Dashboard";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/navbar";
// import MeetingRoom from './pages/MeetingRoom';
// import { useLocation } from 'react-router-dom';
// import AdminLogin from './components/admin/AdminLogin';
// import AdminDashboard from './components/admin/AdminDashboard';
// import ScheduleTask from './components/admin/ScheduleTask';
// import CreateMeeting from './components/admin/CreateMeeting';
// import { AuthContext } from './context/AuthContext';


// const Layout = ({ children }) => {
//   const location = useLocation();

//   return (
//     <>
//       <Navbar />
//       <main className="container mx-auto">{children}</main>
//       {location.pathname !== '/meeting' && <Footer />}
//     </>
//   );
// };

// const App = () => {
//   const { isAdmin } = useContext(AuthContext);
//   return (
//     <AuthProvider>
//       <Router>
//         <Layout>

//         </Layout>
//       <Navbar/>
//         {/* <Header /> */}
        
        
//         <main className="container mx-auto">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             {/* <Route path="/careers" element={<Careers />} /> */}
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/header" element={<Header/>} />
//             <Route path="/meeting" element={<MeetingRoom />} />
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard />: <Navigate to="/admin/login" />} />
//             <Route path="/admin/schedule" element={<ScheduleTask />} />
//             <Route path="/admin/meeting" element={<CreateMeeting />} />
                        
//           </Routes>
               
//         </main>
//         {/* <Footer /> */}
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;



import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MeetingRoom from './pages/MeetingRoom';

import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ScheduleTask from './components/admin/ScheduleTask';
import CreateMeeting from './components/admin/CreateMeeting';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';


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


const AppRoutes = () => {
  const { isAdmin } = useContext(AuthContext); // ✅ safe inside Provider

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/header" element={<Header />} />
        <Route path="/meeting" element={<MeetingRoom />} />
        {/* <Route path="/meeting/:meetingId" element={<MeetingRoom />} /> */}
        {/* <Route path="/meeting" element={<Navigate to={`/meeting/${Date.now()}`} />} />
        <Route path="/meeting/:meetingId" element={<MeetingRoom />} /> */}
        <Route path="/meeting" element={<MeetingRoom />} />
        <Route path="/meeting/:meetingId" element={<MeetingRoom />} />



        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
              path="/admin/dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />

        <Route path="/admin/schedule" element={<ScheduleTask />} />
        <Route path="/admin/meeting" element={<CreateMeeting />} />
      </Routes>
    </Layout>
  );
};



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
