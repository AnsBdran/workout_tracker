import React from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { BiHeart } from 'react-icons/bi';
import { GrGithub } from 'react-icons/gr';
import { ImLinkedin } from 'react-icons/im';
const Footer = () => {
  return (
    <footer className='border-top '>
      <Container className='p-3'>
        <Row className='justify-content-between'>
          <Col
            className='d-flex justify-content-center align-items-center'
            md='4'
          >
            <p className='m-0'>
              Made with <BiHeart /> by:{' '}
              <mark className='highlight'>Anas Badran</mark>
            </p>
          </Col>
          <Col md='5'>
            <p className='text-muted'>Accounts</p>
            <Stack className='fs-4' direction='horizontal' gap={3}>
              <a href='https://github.com/ansbdran' className='icon-link'>
                <GrGithub />
              </a>
              <a
                href='https://www.linkedin.com/in/anas-badran-0ab7b8216/'
                className='icon-link'
              >
                <ImLinkedin />
              </a>
            </Stack>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
