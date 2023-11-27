// src/components/Header.js
import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
        <h3 style={{height: '5vh', background: '#282c34', color: 'white', textAlign: 'center' }}>Welcome to Pulsera</h3>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 5vh;
  margin: 0;
  padding: 0;
  width: '100%';
`;

export default Header;
