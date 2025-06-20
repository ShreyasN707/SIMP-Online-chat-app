const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

require('dotenv').config();
PORT=process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Security middleware
app.use((req, res, next) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Store usernames mapped to socket IDs
const users = {};

// Function to get active user count
function getActiveUserCount() {
  return Object.keys(users).length;
}

// Function to broadcast user count to all clients
function broadcastUserCount() {
  io.emit("user-count", { count: getActiveUserCount() });
}

// Serve static files
app.use(express.static(path.resolve('./public')));

// Route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

// ✅ Handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ Receive and store username with validation
  socket.on("set-username", (username) => {
    // Server-side validation and sanitization
    if (typeof username === 'string' && username.trim().length >= 3 && username.trim().length <= 20) {
      // Remove HTML tags and limit to safe characters
      const sanitizedUsername = username.trim().replace(/<[^>]*>/g, '').replace(/[^\w\s-]/g, '').substring(0, 20);
      if (sanitizedUsername.length >= 3) {
        users[socket.id] = sanitizedUsername;
        console.log(`Username set for ${socket.id}: ${sanitizedUsername}`);
      } else {
        users[socket.id] = "User_" + socket.id.substring(0, 6); // Fallback username
      }
    } else {
      users[socket.id] = "User_" + socket.id.substring(0, 6); // Fallback username
    }
    
    // Broadcast updated user count
    broadcastUserCount();
  });

  // ✅ Handle incoming messages with validation and rate limiting
  socket.on("chat-message", (data) => {
    // Server-side message validation
    if (!data || typeof data.message !== 'string') {
      return; // Ignore invalid messages
    }

    const message = data.message.trim();
    if (message.length === 0 || message.length > 500) {
      return; // Ignore empty or too long messages
    }

    const username = users[socket.id] || "Anonymous";
    
    // Basic rate limiting - store last message time
    const now = Date.now();
    if (!socket.lastMessageTime) {
      socket.lastMessageTime = 0;
    }
    
    // Allow maximum 1 message per second
    if (now - socket.lastMessageTime < 1000) {
      return; // Rate limit exceeded
    }
    
    socket.lastMessageTime = now;

    // Broadcast the message (HTML tags already removed on client side, but double-check)
    io.emit("chat-message", {
      user: username,
      message: message.replace(/<[^>]*>/g, ''), // Remove any HTML tags
      timestamp: new Date().toISOString()
    });
  });

  // ✅ Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete users[socket.id];
    
    // Broadcast updated user count
    broadcastUserCount();
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server Running at PORT :${PORT}`);
});
