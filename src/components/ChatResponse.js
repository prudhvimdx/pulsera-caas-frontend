// src/components/ChatResponse.js
import React from 'react';
import { marked } from 'marked';

const ChatResponse = ({ text }) => {
  const markdownToHtml = marked(text);

  return (
    <div style={responseStyle} dangerouslySetInnerHTML={{ __html: markdownToHtml }} />
      // {/* {text} */}
      
    // </div>
  );
};

const responseStyle = {
  width: '100%',
  margin: '10px 0',
  padding: '10px',
  fontSize: '16px',
  lineHeight: '1.5',
  maxWidth: '80%',
  wordBreak: 'break-word'
};

export default ChatResponse;
