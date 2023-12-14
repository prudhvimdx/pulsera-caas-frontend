import React, { useRef, useEffect, useState } from 'react';

const FollowPromptCard = ({ text, onClick }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    // Calculate the width based on the text length and set it on the card
    if (cardRef.current) {
      const textWidth = cardRef.current.scrollWidth;
      cardRef.current.style.width = `${textWidth}px`;
    }
  }, [text]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const cardStyle = {
    cursor: 'pointer',
    margin: '0px 5px',
    padding: '2px 15px 2px 10px',
    backgroundColor: isHovered ? '#999999' : '#BBBBBB',
    borderRadius: '10px',
    border: '1.7px solid #39bbea',
    textAlign: 'left', // Align text to the left
    display: 'inline-block', // Display cards inline
    whiteSpace: 'nowrap', 
  };

  return (
    <div ref={cardRef} style={cardStyle} onClick={onClick} onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} >
      {text}
    </div>
  );
};



export default FollowPromptCard;