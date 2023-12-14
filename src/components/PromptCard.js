import React from 'react';

const PromptCard = ({ text, onClick }) => {
  return (
    <div style={cardStyle} onClick={onClick}>
      {text}
    </div>
  );
};

const cardStyle = {
  cursor: 'pointer',
  padding: '15px',
  margin: '15px 0',
  backgroundColor: '#f0f0f0',
  borderRadius: '10px',
  textAlign: 'center',
  width: '48%', // Fixed width
  height: '50px', // Fixed height
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export default PromptCard;