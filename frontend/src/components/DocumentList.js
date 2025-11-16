import React, { useState } from 'react';
import './DocumentList.css';

const DocumentList = ({
  documents,
  onCreateDocument,
  onOpenDocument,
  onDeleteDocument,
  currentDocument,
}) => {
  const [newDocTitle, setNewDocTitle] = useState('');

  const handleCreate = () => {
    if (newDocTitle.trim()) {
      onCreateDocument(newDocTitle);
      setNewDocTitle('');
    }
  };

  return (
    <div className="document-list">
      <div className="list-header">
        <h3>Documents</h3>
      </div>

      <div className="create-document">
        <input
          type="text"
          placeholder="New document..."
          value={newDocTitle}
          onChange={(e) => setNewDocTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
          className="input-new-doc"
        />
        <button onClick={handleCreate} className="btn-create">
          +
        </button>
      </div>

      <div className="documents">
        {documents.length === 0 ? (
          <p className="no-documents">No documents yet</p>
        ) : (
          documents.map((doc) => (
            <div
              key={doc._id}
              className={`document-item ${currentDocument === doc._id ? 'active' : ''}`}
            >
              <div
                className="doc-info"
                onClick={() => onOpenDocument(doc._id)}
              >
                <p className="doc-title">{doc.title}</p>
                <p className="doc-date">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                className="btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteDocument(doc._id);
                }}
                title="Delete document"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DocumentList;
