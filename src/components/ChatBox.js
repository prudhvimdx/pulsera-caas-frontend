import React from 'react';
import styled from 'styled-components';
import Chatbot from './Chatbot';
import VideoPlayer from './VideoPlayer';

function ChatBox() {
  return (
    <ChatBoxContainer>
      <VideoPlayer />
      <Chatbot />
    </ChatBoxContainer>
  );
}

const ChatBoxContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default ChatBox;

