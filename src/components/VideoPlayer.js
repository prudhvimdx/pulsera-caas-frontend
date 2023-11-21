import React from 'react';
import styled from 'styled-components';

const VideoPlayer = () => {
  return (
    <VideoContainer>
      <video width="100%" height="100%" controls autoPlay>
        <source src="/pulsera_bot_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  flex: 1;
  background-color: #000;
`;

export default VideoPlayer;
