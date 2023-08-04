import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container fluid='xl'>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
