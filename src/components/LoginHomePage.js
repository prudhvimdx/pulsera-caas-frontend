import React from 'react';
import styled from 'styled-components';
import Login from './Login';
import VideoPlayer from './VideoPlayer';

function LoginHomePage() {
  return (
    <AppContainer>
      <VideoPlayer/>
      <Login />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default LoginHomePage;

