import React, { useState } from 'react';

const ScheduleTask = () => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Task Scheduled:\n${title}\nDeadline: ${deadline}`);
//   };
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     // const res = await fetch('http://localhost:4004/api/admin/task', {
//        const res = await fetch("http://localhost:4004/admin/tasks", {

//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, deadline })
//     });
//     if (res.ok) alert('Task Scheduled in MongoDB');
    
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:4004/api/admin/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, deadline }),
    });

   if (!response.ok) {
  const errText = await response.text();
  console.error('❌ Backend error:', errText); // 👈 you'll see this in DevTools
  throw new Error('Failed to create task');
}

    const data = await response.json();
    alert('✅ Task scheduled successfully!');
  } catch (err) {
   const msg = await err?.response?.text?.();
  console.error('❌ Error scheduling task:', msg || err);
  alert('Error scheduling task');
  }
};

  

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">📝 Schedule Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input type="text" placeholder="Task Title" className="w-full p-2 border" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="datetime-local" className="w-full p-2 border" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleTask;
