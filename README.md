# Real-Time Collaborative Document Editor

The Real-Time Collaborative Document Editor is a web-based application that allows multiple users to edit the same document at the same time with instant synchronization. Designed similar to Google Docs, the system uses real-time communication technology to ensure that every change made by a user is immediately reflected for all other users connected to the same document.
The editor maintains text consistency using synchronization algorithms like Operational Transformation (OT) or CRDTs while providing a smooth, user-friendly editing experience. This project demonstrates practical full-stack development, real-time data handling, and collaborative system design.

🎯 Purpose of the Project

The purpose of the Real-Time Collaborative Document Editor is to:

Demonstrate real-time bidirectional communication between client and server.

Showcase how collaborative platforms manage concurrent edits.

Provide hands-on experience with WebSockets/Socket.IO.

Show how distributed systems maintain data consistency.

Build a functional tool for teamwork, remote collaboration, and shared writing.

Serve as a full-stack learning project suitable for academic submission or portfolio use.


## Features

✨ **Real-Time Collaboration** - Multiple users editing documents simultaneously
✏️ **Rich Text Editor** - Full formatting capabilities with React Quill
👥 **Active Users Display** - See who's currently online
📱 **Responsive Design** - Works seamlessly on desktop and mobile
🚀 **Fast & Scalable** - Built with modern technologies
💾 **Persistent Storage** - All documents saved in MongoDB
🔄 **Live Updates** - Content syncs instantly across all connected users

## Tech Stack

### Frontend
- **React.js** 18.2 - UI framework
- **React Quill** 2.0 - Rich text editor
- **Socket.IO Client** 4.5 - Real-time communication
- **CSS3** - Responsive styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18 - Web framework
- **Socket.IO** 4.5 - Real-time server
- **Mongoose** 7.0 - MongoDB ODM
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB** - NoSQL database for document storage

📚 Use Cases
✔ 1. Team Collaboration

Students, teams, or coworkers can work on assignments, reports, or notes together.

✔ 2. Live Note-Taking

During online meetings or classes, participants can take shared notes in real time.

✔ 3. Pair Programming / Coding Together

Developers can use it to collaborate on text or code snippets.

✔ 4. Training & Workshops

Instructors can demonstrate editing concepts while students follow live.

✔ 5. Small Organizations

Data entry tasks or documentation handled by multiple people simultaneously.

## Architecture overview:
<img width="1038" height="607" alt="Image" src="https://github.com/user-attachments/assets/7c63bff5-8013-4822-8a10-725ec12b6025" />

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `CLIENT_URL` - Client application URL
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `REACT_APP_SERVER_URL` - Backend server URL

---

**Built with ❤️ for collaborative editing**
