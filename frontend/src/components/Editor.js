import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

const Editor = ({ socket, docId }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('documentContent', (data) => {
        setContent(data.content);
        setTitle(data.title);
      });

      socket.on('contentUpdate', (data) => {
        setContent(data.content);
      });

      socket.emit('getDocument', { docId });
    }

    return () => {
      if (socket) {
        socket.off('documentContent');
        socket.off('contentUpdate');
      }
    };
  }, [socket, docId]);

  const handleContentChange = (value) => {
    setContent(value);
    if (socket) {
      socket.emit('updateContent', {
        docId,
        content: value,
      });
    }
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
    if (socket) {
      socket.emit('updateTitle', {
        docId,
        title: newTitle,
      });
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="title-input"
            autoFocus
          />
        ) : (
          <h1 onClick={() => setIsEditing(true)} className="document-title">
            {title || 'Untitled Document'}
          </h1>
        )}
      </div>
      <div className="editor-wrapper">
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder="Start typing..."
          className="quill-editor"
        />
      </div>
    </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image', 'video']
  ],
};

Editor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'list', 'indent',
  'script',
  'direction',
  'size',
  'color', 'background',
  'align',
  'link', 'image', 'video'
];

export default Editor;
