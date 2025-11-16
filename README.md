# Real-Time Collaborative Document Editor

A modern, real-time collaborative document editing application built with React.js, Node.js, Express, and MongoDB. Multiple users can simultaneously edit documents with live synchronization.

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

## Project Structure

```
REAL-TIME COLLABORATIVE DOCUMENT EDITOR/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.js
│   │   │   ├── Editor.css
│   │   │   ├── DocumentList.js
│   │   │   ├── DocumentList.css
│   │   │   ├── Header.js
│   │   │   └── Header.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── README.md
└── .github/
    └── copilot-instructions.md
```

## Installation

### Prerequisites
- Node.js 14+ and npm
- MongoDB 4.4+ (local or MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
MONGODB_URI=mongodb://localhost:27017/collab-editor
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```bash
REACT_APP_SERVER_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Usage

1. **Create a Document**
   - Click the "+" button in the sidebar
   - Enter a document title
   - Press Enter or click the create button

2. **Edit a Document**
   - Click on a document in the sidebar to open it
   - Edit the content using the rich text editor
   - Changes are saved automatically and synced in real-time

3. **Collaborate**
   - Share the URL with other users
   - See active users in the header
   - Watch changes happen in real-time

4. **Delete a Document**
   - Click the "✕" button on a document
   - The document is permanently deleted

## API Endpoints

### GET /api/documents
Get all documents

### GET /api/documents/:id
Get a specific document by ID

### POST /api/documents
Create a new document
```json
{
  "title": "My Document",
  "content": ""
}
```

### PUT /api/documents/:id
Update a document
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

### DELETE /api/documents/:id
Delete a document

### GET /api/health
Health check endpoint

## Socket.IO Events

### Client to Server
- `requestDocuments` - Request list of all documents
- `createDocument` - Create a new document
- `joinDocument` - Join a document room
- `getDocument` - Get document content
- `updateContent` - Update document content
- `updateTitle` - Update document title
- `deleteDocument` - Delete a document

### Server to Client
- `documentsList` - Send list of documents
- `documentContent` - Send document content
- `contentUpdate` - Broadcast content updates
- `titleUpdated` - Broadcast title updates
- `documentCreated` - Notify of new document
- `documentDeleted` - Notify of deleted document
- `activeUsers` - Send list of active users

## Development

### Run Backend in Development Mode
```bash
cd backend
npm run dev
```
This uses nodemon for automatic restart on file changes.

### Build Frontend for Production
```bash
cd frontend
npm run build
```
Creates an optimized production build in the `build` folder.

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `CLIENT_URL` - Client application URL
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `REACT_APP_SERVER_URL` - Backend server URL

## Features to Implement

- [ ] User authentication and authorization
- [ ] Document sharing and permissions
- [ ] Version history and undo/redo
- [ ] Comments and mentions
- [ ] Document export (PDF, DOCX)
- [ ] Real-time cursor positions
- [ ] User presence indicators
- [ ] Keyboard shortcuts

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or provide correct connection string
- For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/collab-editor`

### Socket.IO Connection Error
- Check if backend is running on the correct port
- Verify CORS settings match your frontend URL
- Check browser console for specific error messages

### Port Already in Use
- Backend: Change PORT in `.env` and `REACT_APP_SERVER_URL` in frontend
- Frontend: Set PORT environment variable: `PORT=3001 npm start`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ for collaborative editing**
