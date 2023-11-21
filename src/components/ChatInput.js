// src/components/ChatInput.js
import React, { useState } from 'react';
// Uncomment the following lines if you're using Font Awesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputContainerStyle}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          style={textareaStyle}
        ></textarea>
        <button type="submit" style={iconStyle}>
          <img src="/send_buttton.png" alt="Send" style={{ width: '20px', height: '20px' }} />
        </button>
      </div>
    </form>
  );
};
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'fixed',
    bottom: '5vh',
    left: '0',
    right: '0.5%',
};

const inputContainerStyle = {
    position: 'relative',
    width: '49%',
};

const textareaStyle = {
    width: '100%',
    height: '30px',
    padding: '5px',
    paddingRight: '30px', // Increase padding to make room for the icon
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    resize: 'none',
    overflow: 'hidden'
};

const iconStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer'
};

export default ChatInput;
