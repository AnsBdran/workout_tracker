import React from 'react';
import { Badge, Container, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark'>
        <Container>
          <Navbar.Brand className='text-white'>Workout Buddy</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
