// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
        <footer style={{ height: '5vh', background: '#282c34', color: 'white', textAlign: 'center' }}>
            <p>Powered By MDxBlocks</p>
        </footer>
    </FooterContainer>

  );
};

const FooterContainer = styled.div`
  // height: 5vh;
  // bottom: 0;
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'flex-end',
  // position: 'fixed',
  // bottom: '0vh',
  // left: '0',
  // right: '0.5%',
  position: 'relative',
  width: '100%',
`;

export default Footer;
