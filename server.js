const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

require('dotenv').config();
PORT=process.env.PORT || 6045;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store usernames mapped to socket IDs
const users = {};

// Serve static files
app.use(express.static(path.resolve('./public')));

// Route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

// ✅ Handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ Receive and store username
  socket.on("set-username", (username) => {
    users[socket.id] = username;
  });

  // ✅ Handle incoming messages and broadcast
  socket.on("chat-message", (data) => {
    const username = users[socket.id] || "Anonymous";
    io.emit("chat-message", {
      user: username,
      message: data.message
    });
  });

  // ✅ Handle user disconnect
  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

// Start server
server.listen(4000, () => {
  console.log(`Server Running at PORT :${PORT}`);
});
