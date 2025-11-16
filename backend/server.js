const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory document storage
let documents = [];
let documentCounter = 1;

// MongoDB Connection (optional)
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/collab-editor';
let mongoConnected = false;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  mongoConnected = true;
})
.catch(err => {
  console.log('MongoDB not available, using in-memory storage');
  mongoConnected = false;
});

// Models
const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Document'
  },
  content: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  collaborators: [{
    type: String
  }]
});

const Document = mongoConnected ? mongoose.model('Document', documentSchema) : null;

// Store active users
const activeUsers = new Set();
const userDocuments = new Map();

// Socket.IO Events
io.on('connection', async (socket) => {
  console.log('New client connected:', socket.id);
  activeUsers.add(socket.id);

  // Send documents list immediately on connection
  socket.emit('documentsList', documents);
  io.emit('activeUsers', Array.from(activeUsers));

  // Also handle explicit request for documents
  socket.on('requestDocuments', async () => {
    socket.emit('documentsList', documents);
  });

  // Create new document
  socket.on('createDocument', async (data) => {
    try {
      const newDoc = {
        _id: `doc_${documentCounter++}`,
        title: data.title || 'Untitled Document',
        content: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        collaborators: []
      };
      documents.unshift(newDoc);
      io.emit('documentsList', documents);
      console.log('Document created:', newDoc.title);
    } catch (err) {
      console.error('Error creating document:', err);
    }
  });

  // Join document
  socket.on('joinDocument', (data) => {
    const { docId } = data;
    socket.join(`doc-${docId}`);
    userDocuments.set(socket.id, docId);
    io.emit('activeUsers', Array.from(activeUsers));
  });

  // Get document content
  socket.on('getDocument', async (data) => {
    try {
      const { docId } = data;
      const document = documents.find(d => d._id === docId);
      if (document) {
        socket.emit('documentContent', {
          title: document.title,
          content: document.content,
        });
      }
    } catch (err) {
      console.error('Error fetching document:', err);
    }
  });

  // Update content
  socket.on('updateContent', async (data) => {
    try {
      const { docId, content } = data;
      const doc = documents.find(d => d._id === docId);
      if (doc) {
        doc.content = content;
        doc.updatedAt = new Date();
        io.to(`doc-${docId}`).emit('contentUpdate', { content });
      }
    } catch (err) {
      console.error('Error updating content:', err);
    }
  });

  // Update title
  socket.on('updateTitle', async (data) => {
    try {
      const { docId, title } = data;
      const doc = documents.find(d => d._id === docId);
      if (doc) {
        doc.title = title;
        doc.updatedAt = new Date();
        io.emit('documentsList', documents);
      }
    } catch (err) {
      console.error('Error updating title:', err);
    }
  });

  // Delete document
  socket.on('deleteDocument', async (data) => {
    try {
      const { docId } = data;
      documents = documents.filter(d => d._id !== docId);
      io.emit('documentsList', documents);
      console.log('Document deleted:', docId);
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    activeUsers.delete(socket.id);
    userDocuments.delete(socket.id);
    io.emit('activeUsers', Array.from(activeUsers));
  });
});

// REST API Routes
app.get('/api/documents', async (req, res) => {
  res.json(documents);
});

app.get('/api/documents/:id', async (req, res) => {
  const document = documents.find(d => d._id === req.params.id);
  if (!document) return res.status(404).json({ error: 'Document not found' });
  res.json(document);
});

app.post('/api/documents', async (req, res) => {
  try {
    const newDoc = {
      _id: `doc_${documentCounter++}`,
      title: req.body.title || 'Untitled Document',
      content: req.body.content || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      collaborators: []
    };
    documents.push(newDoc);
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/documents/:id', async (req, res) => {
  try {
    const document = documents.find(d => d._id === req.params.id);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    
    if (req.body.title) document.title = req.body.title;
    if (req.body.content !== undefined) document.content = req.body.content;
    document.updatedAt = new Date();
    
    res.json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/documents/:id', async (req, res) => {
  try {
    documents = documents.filter(d => d._id !== req.params.id);
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
