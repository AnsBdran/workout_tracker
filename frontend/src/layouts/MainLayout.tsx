import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';

const MainLayout = () => {
  return (
    <div
      className='d-flex flex-column justify-content-between '
      style={{ minHeight: '100vh' }}
    >
      <Header />
      <main>
        <Container fluid='xl'>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
