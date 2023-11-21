import React from 'react';
import styled from 'styled-components';
import Chatbot from './components/Chatbot';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

function App() {
  return (
    <AppContainer>
      <VideoPlayer />
      <Chatbot />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

export default App;

