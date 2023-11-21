// src/components/ChatResponse.js
import React from 'react';

const ChatResponse = ({ text }) => {
  return (
    <div style={responseStyle}>
      {text}
    </div>
  );
};

const responseStyle = {
//   height: '80vh',
  width: '100%',
  margin: '10px 0',
  padding: '10px',
  fontSize: '16px',
  lineHeight: '1.5',
  maxWidth: '80%',
  wordBreak: 'break-word'
};

export default ChatResponse;
