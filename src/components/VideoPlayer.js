import React from 'react';
import styled from 'styled-components';

const VideoPlayer = () => {
  return (
    <VideoContainer>
      <div className="Logo" style={LogoStyle}>
        <img width='100%' src="/mdxblocks_black_logo.webp" alt="MDxBlocks Logo" />  
      </div>
      <video width="100%" controls autoPlay>
        <source src="/pulsera_bot_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  flex: 1;
  background-color: #FFF;
`;

const LogoStyle = {
  padding: '20px 0px'
};

export default VideoPlayer;
