import React from 'react';
import styled from 'styled-components';
// import { Widget } from 'react-chat-widget';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import 'react-chat-widget/lib/styles.css';

const Chatbot = () => {
  return (
    <ChatContainer>
      <Header />
      <MainContent />
      <Footer />
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  height: 80vh;
  width: 75%;
`;

export default Chatbot;
