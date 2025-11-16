import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Editor from './components/Editor';
import DocumentList from './components/DocumentList';
import Header from './components/Header';

const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

function App() {
  const [socket, setSocket] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('documentsList', (docs) => {
      setDocuments(docs);
    });

    newSocket.on('activeUsers', (users) => {
      setActiveUsers(users);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleCreateDocument = (title) => {
    if (socket) {
      socket.emit('createDocument', { title });
    }
  };

  const handleOpenDocument = (docId) => {
    setCurrentDocument(docId);
    if (socket) {
      socket.emit('joinDocument', { docId });
    }
  };

  const handleDeleteDocument = (docId) => {
    if (socket) {
      socket.emit('deleteDocument', { docId });
    }
  };

  return (
    <div className="App">
      <Header activeUsers={activeUsers} />
      <div className="app-container">
        <div className="sidebar">
          <DocumentList
            documents={documents}
            onCreateDocument={handleCreateDocument}
            onOpenDocument={handleOpenDocument}
            onDeleteDocument={handleDeleteDocument}
            currentDocument={currentDocument}
          />
        </div>
        <div className="main-content">
          {currentDocument && socket ? (
            <Editor socket={socket} docId={currentDocument} />
          ) : (
            <div className="welcome-message">
              <h2>Welcome to Collaborative Document Editor</h2>
              <p>Create a new document or select an existing one to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
