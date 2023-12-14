import React from 'react';
import styled from 'styled-components';
import Signup from './Signup';
import VideoPlayer from './VideoPlayer';

function SignupHomePage() {
  return (
    <AppContainer>
      <VideoPlayer/>
      <Signup />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default SignupHomePage;

