const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const feedbackRoutes = require("./routes/feedbackRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes"); // Import About Routes
const Feedback = require("./models/feedback");
const Task = require("./models/Task");
const meetingRoutes = require('./routes/meetingRoutes');
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const adminRoutes = require('./routes/adminRoutes');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
// app.use('/api/admin', adminRoutes);
app.use('/api/admin', adminRoutes); // ✅ required
app.use('/api/meeting', meetingRoutes);


app.use(express.json());
app.use(cors({
 origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true


}));


// mongoose.connect('mongodb://localhost:27017/zidio', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/tasks', require('./routes/taskRoutes'));

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
// app.use("/tasks", taskRoutes);
app.use("/api/about", aboutRoutes); // Add About API Route

// ✅ Create a Task and Broadcast the Event
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    io.emit("taskAdded", newTask); // Broadcast new task
    console.log(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});




// ✅ Emit updates when a task is updated
app.put("/tasks/:id", async (req, res) => {
  try {
    const { status, progress } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status, progress },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    console.log("Emitting taskUpdated:", updatedTask); // ✅ Debug log
    io.emit("taskUpdated", updatedTask);
    // console.log(updatedTask)
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});
// ✅ Delete Task (Real-Time)
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    io.emit("taskDeleted", task._id); // Emit event to all clients
    res.json({ message: "Task deleted" });
    console.log(task._id);
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});
// Get tasks by priority
app.get("/tasks/filter/:priority", async (req, res) => {
  try {
    const tasks = await Task.find({ priority: req.params.priority });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
// Get tasks completed in a given time frame
app.get("/tasks/progress/:timeframe", async (req, res) => {
  try {
    let dateRange;
    const now = new Date();

    if (req.params.timeframe === "daily") {
      dateRange = new Date(now.setDate(now.getDate() - 1));
    } else if (req.params.timeframe === "weekly") {
      dateRange = new Date(now.setDate(now.getDate() - 7));
    } else if (req.params.timeframe === "monthly") {
      dateRange = new Date(now.setMonth(now.getMonth() - 1));
    }

    const tasks = await Task.find({
      status: "Completed",
      createdAt: { $gte: dateRange },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Submit feedback
app.post("/feedback", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });

    await newFeedback.save();

    // Emit real-time update
    io.emit("newFeedback", newFeedback);
    console.log(newFeedback);
    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    res.status(500).json({ error: "Error submitting feedback" });
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// let participants = {};


  // socketIo.on("join-meeting", ({ meetingId, name }) => {
  //   participants[socket.id] = { meetingId, name };
  //   const current = Object.values(participants).filter(p => p.meetingId === meetingId);
  //   io.to(meetingId).emit("participants-update", current);
  //   socketIo.join(meetingId);
  // });

  // socketIo.on("disconnect", () => {
  //   const { meetingId } = participants[socketIo.id] || {};
  //   delete participants[socketIo.id];
  //   const current = Object.values(participants).filter(p => p.meetingId === meetingId);
  //   io.to(meetingId).emit("participants-update", current);
  //   console.log("🔴 Disconnected:", socketIo.id);
  // });


// ✅ Correct pattern: use `connection` event
// io.on("connection", (io) => {
//   console.log("✅ New socket connection:", io.id);

//   io.on("join-meeting", ({ meetingId, name }) => {
//     console.log(`${name} joined meeting: ${meetingId}`);
//    io.join(meetingId);

//     // Broadcast to others in the room
//     io.to(meetingId).emit("user-joined", { name, id: io.id });
//   });

//  io.on("disconnect", () => {
//     console.log("User disconnected:", io.id);
//   });
// });
io.on("connection", (socket) => {
  console.log("✅ Connected:", socket.id);

  socket.on("join-meeting", ({ meetingId, name }) => {
    socket.join(meetingId);
    console.log(`${name} joined ${meetingId}`);

    io.to(meetingId).emit("user-joined", { id: socket.id, name });
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
  });
});






const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀Server running on port ${PORT}`));
