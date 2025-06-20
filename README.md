# SIMP Online Chat App

A modern, feature-rich real-time chat application with multiple themes and enhanced security features.

## Features

### 🚀 Core Features
- **Real-time messaging** using Socket.io
- **Live user count** - see how many people are online
- **Typing indicators** - know when others are typing
- **Multiple themes** - Dark, Light, Ocean, Forest, and Cosmic themes
- **Responsive design** - works on desktop and mobile devices

### 🔒 Security Features
- **Input validation & sanitization** - prevents XSS attacks
- **Rate limiting** - maximum 1 message per second per user
- **Security headers** - X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **HTML tag filtering** - removes potentially harmful HTML from messages
- **Username validation** - 3-20 characters with safe character filtering

### 🎨 User Experience
- **Theme persistence** - remembers your preferred theme
- **Message timestamps** - shows when messages were sent
- **Auto-scroll** - automatically scrolls to newest messages
- **500 character message limit** - prevents spam
- **Fallback usernames** - automatic username generation if validation fails

## Tech Stack

- **Backend**: Node.js + Express.js
- **Real-time Communication**: Socket.io
- **Frontend**: HTML5/CSS3/Vanilla JavaScript
- **Environment**: dotenv for configuration
- **Development**: Nodemon for auto-restart

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd SIMP-Online-chat-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   ```bash
   # Create .env file for custom port
   echo "PORT=3000" > .env
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open browser:**
   Navigate to `http://localhost:3000`

## How to Use

1. **Join the chat** - The page loads directly into the chat interface
2. **Set your username** - Enter a username (3-20 characters, automatically validated)
3. **Choose a theme** - Click the theme button (🎨) to select from 5 different themes
4. **Start chatting** - Type your message and press Enter or click Send
5. **See who's online** - User count is displayed in the header
6. **Watch typing indicators** - See when others are typing

## Available Themes

- 🌙 **Dark** - Default dark theme with cyan accents
- ☀️ **Light** - Clean light theme for daytime use
- 🌊 **Ocean** - Blue ocean-inspired theme
- 🌿 **Forest** - Green nature-inspired theme
- 🔮 **Cosmic** - Purple space-inspired theme

## Project Structure

```
├── server.js              # Express server and Socket.io logic
├── package.json           # Dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
└── public/
    ├── index.html        # Chat interface with themes and features
    └── styles.css        # CSS with theme variables and responsive design
```

## API Endpoints

- `GET /` - Serves the main chat interface
- `WebSocket /socket.io` - Real-time communication

## Socket Events

### Client to Server
- `set-username` - Set user's display name
- `chat-message` - Send a chat message
- `typing` - Indicate user is typing
- `stop-typing` - Indicate user stopped typing

### Server to Client
- `chat-message` - Receive a chat message
- `user-count` - Updated online user count
- `user-typing` - Someone started typing
- `user-stop-typing` - Someone stopped typing

## Development

The app uses Nodemon for development, which automatically restarts the server when files change:

```bash
npm start  # Uses nodemon for auto-restart
```

## Security Considerations

- All user inputs are validated and sanitized
- Rate limiting prevents message spam
- XSS protection through proper content handling
- Security headers prevent common attacks
- HTML content is stripped from messages
