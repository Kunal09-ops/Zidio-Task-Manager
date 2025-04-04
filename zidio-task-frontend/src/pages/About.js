import React, { useEffect, useState } from "react";
import axios from "axios";
// import tanmoyImg from "../assets/tanmoyImg.png"
// import tarunImg from "../assets/tarun.png"
// import gayatriImg from "../assets/gayatri.jpg"
// import SatyaImg from "../assets/Satya.jpg"
// import user from "../assets/user.png"
// const teamMembers = [
//   {
//     name: "Tarun",
//     role: "Project Manager",
//     image: tarunImg,
//   },
//   {
//     name: "Tanmoy Das",
//     role: "Full Stack Developer",
//     image: tanmoyImg,
//   },
//   {
//     name: "Gayatri Sawant",
//     role: "Frontend Developer",
//     image: gayatriImg,

//   },
//   {
//     name: "Satya Prakash",
//     role: "Backend Developer",
//     image: SatyaImg,
//   },
//   {
//     name: "Pavan Gowda",
//     role: "Backend Developer",
//     image: user,
//   },
//   {
//     name: "Pradi",
//     role: "Backend Developer",
//     image: user,
//   }
// ];

// const About = () => {
//   const [aboutInfo, setAboutInfo] = useState({});

//   useEffect(() => {
//     axios.get("http://localhost:4004/api/about").then((response) => {
//       setAboutInfo(response.data);
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-blue-50 py-10 px-4 shadow-lg rounded-lg ">
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h1>
//         <p className="text-xl white-600">{aboutInfo.team}</p>
//         <p className="text-xl white-600 mb-8">
//           We are a dedicated team of professionals committed to delivering top-notch solutions.
//         </p>
//       </div>
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
//         {teamMembers.map((member, index) => (
//           <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
//             <img
//               src={member.image}
//               alt={member.name}
//               className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-gray-300 hover:scale-105 transition-transform duration-300 "
//             />
//             <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
//             <p className="text-gray-500">{member.role}</p>
//           </div>
//         ))}
//       </div>
//       <div className="max-w-4xl mx-auto text-center pt-10">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">{aboutInfo.title}</h2>
//         <p className="text-xl white-600">{aboutInfo.description}</p>
//         <p className="text-xl white-600">{aboutInfo.project}</p>
//       </div>
//     </div>
//   );
// };

// const About = () => {

//   const [info, setInfo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/posts/1')
//       .then((res) => {
//         setInfo(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//         setLoading(false);
//       });
//   }, []);
  
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
//           About Zidio Task Manager
//         </h1>
//         <p className="text-lg text-gray-600 text-center mb-6">
//           Zidio Task Manager helps teams and individuals stay organized and boost productivity. 
//           With powerful features and a clean interface, managing tasks has never been easier.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="p-6 bg-gray-50 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               🔥 Key Features
//             </h2>
//             <ul className="text-gray-600 space-y-2">
//               <li>✅ Intuitive task management</li>
//               <li>📅 Smart scheduling & reminders</li>
//               <li>📊 Real-time collaboration</li>
//               <li>🌍 Accessible from anywhere</li>
//             </ul>
//           </div>

//           <div className="p-6 bg-gray-50 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               🚀 Why Choose Zidio?
//             </h2>
//             <ul className="text-gray-600 space-y-2">
//               <li>⚡ Fast & user-friendly interface</li>
//               <li>🔐 Secure data handling</li>
//               <li>📱 Mobile & desktop friendly</li>
//               <li>💡 Constant updates & improvements</li>
//             </ul>
//           </div>
//         </div>

//         <div className="text-center mt-8">
//           <a
//             href="/"
//             className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all"
//           >
//             Back to Home
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };




// NEW CODE
const About = () => {
  const [features, setFeatures] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAboutPageData = async () => {
      try {
        setLoading(true);

        // Replace these URLs with your actual backend endpoints
        const [featuresRes, statsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/features'),
          axios.get('http://localhost:5000/api/stats'),
        ]);

        setFeatures(featuresRes.data);
        setStats(statsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching About page data:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchAboutPageData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">About Zidio Task Manager</h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Zidio Task Manager is a robust and scalable productivity platform designed for modern teams and individuals. 
          Our mission is to help people organize work, increase focus, and deliver results — efficiently.
        </p>

        {/* 📊 Stats Section */}
        {!loading && !error && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="bg-blue-100 text-center p-5 rounded-xl shadow">
                <div className="text-3xl font-bold text-blue-700">{value}</div>
                <div className="text-gray-700 mt-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            ))}
          </div>
        )}

        {/* 🔥 Key Features */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Features</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="animate-pulse bg-gray-100 h-28 rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">⚠️ Failed to load content. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {features.map((feature) => (
              <div key={feature._id} className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow">
                <h3 className="text-xl font-semibold text-blue-800">{feature.title}</h3>
                <p className="text-gray-700 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* 📢 CTA */}
        <div className="text-center mt-10">
          <a
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

