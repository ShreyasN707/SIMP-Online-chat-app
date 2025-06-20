# SIMP Online Chat App

A real-time chat application with a modern dark theme interface.

## Features

- Real-time messaging using Socket.io
- Dark theme UI
- Username validation and input sanitization
- Rate limiting protection
- Responsive design

## Tech Stack

- Node.js + Express.js
- Socket.io
- HTML/CSS/JavaScript

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open browser:**
   Go to `http://localhost:3000`

## How to Use

1. Enter a username (3-20 characters)
2. Type your message and press Enter
3. Chat with other users in real-time

## Project Structure

```
├── server.js          # Server and Socket.io logic
├── package.json       # Dependencies
└── public/
    ├── index.html     # Chat interface
    └── styles.css     # Styling
```
