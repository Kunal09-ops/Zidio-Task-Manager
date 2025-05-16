import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  if (!isAdmin) return <p>Access Denied</p>;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">👨‍💼 Admin Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <button onClick={() => navigate('/admin/schedule')} className="p-4 bg-green-500 text-white rounded">📆 Schedule Task</button>
        <button onClick={() => navigate('/admin/meeting')} className="p-4 bg-blue-500 text-white rounded">📹 Create Meeting</button>
      </div>
    </div>
    
  );
};

export default AdminDashboard;
