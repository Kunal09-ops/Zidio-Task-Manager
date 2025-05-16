// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Peer from "simple-peer";


// const socket = io("http://localhost:5001"); // Connect to RTC signaling server

// const MeetingRoom = ({ roomId = "zidio-room" }) => {
//     const [peers, setPeers] = useState([]);
//     const userVideo = useRef();
//     const peersRef = useRef([]);

//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
//             userVideo.current.srcObject = stream;
//             socket.emit("join-room", roomId, socket.id);

//             socket.on("user-connected", (userId) => {
//                 const peer = new Peer({ initiator: true, trickle: false, stream });
//                 peer.on("signal", (signal) => {
//                     socket.emit("sending-signal", { userId, signal });
//                 });

//                 peersRef.current.push({ peerID: userId, peer });
//                 setPeers([...peersRef.current]);
//             });
//         });
//     }, [roomId]);

//     return (
//         <div className="container mt-5 text-center">
//             <h3>Meeting Room</h3>
//             <video ref={userVideo} autoPlay playsInline style={{ width: "300px", margin: "10px" }} />
//             {peers.map((peer, index) => (
//                 <Video key={index} peer={peer.peer} />
//             ))}
//         </div>
//     );
// };

// const Video = ({ peer }) => {
//     const ref = useRef();
//     useEffect(() => {
//         peer.on("stream", (stream) => {
//             ref.current.srcObject = stream;
//         });
//     }, [peer]);
//     return <video ref={ref} autoPlay playsInline style={{ width: "300px", margin: "10px" }} />;
// };

// export default MeetingRoom;
import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { socket } from "../socket";


// const socket = io('http://localhost:4004', { transports: ["websocket"], // optional: avoids polling
// });

const MeetingPage = () => {
  const userVideo = useRef();
  const [participants, setParticipants] = useState([]);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [stream, setStream] = useState(null);
  const [time, setTime] = useState(new Date());
  const { meetingId } = useParams();
  // const roomId = meetingId || "default-room";
  const videoRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  

  useEffect(() => {
    socket.emit("join-meeting", { meetingId, name: user?.name || "Guest" });

    socket.on("participants-update", (list) => {
      setParticipants(list);
    });

    return () => socket.disconnect();
  }, [meetingId,user?.name]);

  useEffect(() => {
    const host = localStorage.getItem("user") 
      ? JSON.parse(localStorage.getItem("user")).email 
      : "Guest";

    fetch('http://localhost:4004/api/meeting/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingId, host })
    }).then(res => res.json())
      .then(data => console.log('✅ Meeting saved:', data))
      .catch(err => console.error('❌ Failed to save meeting', err));
  }, [meetingId]);
  
  
  

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);
   useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      setStream(stream);
      socket.emit('join-room', 'zidio-room', socket.id);
    });


  
    


    

    socket.on('user-connected', (id) => {
      setParticipants((prev) => [...prev, { id }]);
    });

    socket.on('receive-message', ({ user, text }) => {
      setChat((prev) => [...prev, { user, text }]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit('send-message', { user: 'You', text: message });
    setChat([...chat, { user: 'You', text: message }]);
    setMessage('');
  };
  
  // const toggleCamera = async () => {
  //   if (!cameraOn) {
  //     try {
  //       const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
  //       videoRef.current.srcObject = mediaStream;
  //       setStream(mediaStream);
  //       setCameraOn(true);
  //     } catch (err) {
  //       console.error('Camera access error:', err);
  //     }
  //   } else {
  //     // Stop stream
  //     if (stream) {
  //       stream.getTracks().forEach((track) => track.stop());
  //     }
  //     videoRef.current.srcObject = null;
  //     setCameraOn(false);
  //   }
  // };   
  const toggleCamera = async () => {
    if (!cameraOn) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
        setCameraOn(true);
      } catch (err) {
        alert('Camera permission denied or not available');
        console.error(err);
      }
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setCameraOn(false);
    }
  };


   const generateMeetingLink = () => {
    const link = `${window.location.origin}/meeting/${Math.random().toString(36).substring(2, 10)}`;
    setMeetingLink(link);
    navigator.clipboard.writeText(link);
    alert(`Meeting link copied: ${link}`);
  };


  const toggleMute = () => {
    if (!stream) return;
    const enabled = stream.getAudioTracks()[0].enabled;
    stream.getAudioTracks()[0].enabled = !enabled;
    setIsMuted(enabled);
  };

  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row gap-4 h-full">

        
        {/* Video Section */}
        <div className="flex-1 bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Meeting Room</h2>
            <div className="text-sm text-gray-500">
              {time.toLocaleTimeString()}
            </div>
          </div>
          <video ref={userVideo} autoPlay muted className="w-full rounded-lg shadow" />
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={toggleMute}
              className={`px-4 py-2 rounded font-semibold ${isMuted ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
              Leave
            </button>
          </div>
        </div>
       


        {/* Chat & Participants */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          {/* Participants */}
          <div className="bg-white shadow rounded-lg p-4 h-1/2 overflow-auto">
            <h3 className="text-lg font-semibold mb-2">Participants</h3>
            <ul className="space-y-2">
              {participants.map((p, i) => (
                <li key={i} className="text-gray-700">👤 {p.id}</li>
              ))}
            </ul>
          </div>

{/* mycode */}
          <div className='p-6 text-center'>
               <h2 className="text-2xl font-bold mb-4">Meeting ID: {123456789}</h2>



          </div>




          <div className="space-x-4">
               <button
          onClick={toggleCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
        </button>

        <button
          onClick={generateMeetingLink}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Meeting Link
        </button>

          </div>
    
        {meetingLink && (
        <div className="mt-4">
          <p className="text-sm">🔗 Share this link:</p>
          <code className="bg-gray-200 px-2 py-1 rounded">{meetingLink}</code>
        </div>
      )}



      <div className='p-4'>Meeting Room:{meetingId} </div>

        
          
        

          {/* Chat */}
          <div className="bg-white shadow rounded-lg flex flex-col h-1/2">
            <div className="p-4 overflow-auto flex-1 space-y-2">
              {chat.map((c, i) => (
                <div key={i} className="text-sm">
                  <span className="font-semibold">{c.user}:</span> {c.text}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex border-t">
              <input
                className="flex-1 px-3 py-2 outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
              />
              <button type="submit" className="px-4 bg-blue-500 text-white">Send</button>
            </form>
          </div>
        </div>
      </div>


    
      
    </div>
  );
};

export default MeetingPage;
