// src/components/PromptCard.js
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


// import React from 'react';

// const formatTextToHtmlCard = (text) => {
//   // Replace newline characters with HTML line breaks
//   const formattedText = text.replace(/\n/g, '<br>');
  
//   // Create the HTML card structure
//   const htmlCard = `
//     <div style="${cardStyle}">
//       ${formattedText}
//     </div>
//   `;
  
//   return htmlCard;
// };


// const cardStyle = {
//   padding: '15px',
//   backgroundColor: '#f0f0f0',
//   borderRadius: '10px',
//   textAlign: 'left',
//   maxWidth: '300px', // Adjust the maximum width as needed
//   wordWrap: 'break-word', // Wrap long words
// };

// export default formatTextToHtmlCard;