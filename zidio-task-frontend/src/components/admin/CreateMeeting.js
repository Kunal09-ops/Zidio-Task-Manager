import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateMeeting = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

//   const handleCreate = (e) => {
//     e.preventDefault();
//     navigate(`/meeting?room=${roomId}`);
//   };
const handleCreate = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/admin/meeting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId })
    });
    navigate(`/meeting?room=${roomId}`);
  };
  
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">🎥 Create Meeting</h2>
      <form onSubmit={handleCreate} className="space-y-4 max-w-md">
        <input type="text" placeholder="Enter Meeting Room ID" className="w-full p-2 border" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Launch</button>
      </form>
    </div>
  );
};

export default CreateMeeting;
