import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <header>
      <Navbar bg='body-tertiary shadow'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Workout Buddy
          </Navbar.Brand>
          <Nav className='gap-2'>
            {!user ? (
              <>
                <Nav.Link as={Link} to='login'>
                  Log in
                </Nav.Link>
                <Nav.Link as={Link} to='signup' className='btn btn-primary '>
                  Sign up
                </Nav.Link>
              </>
            ) : (
              <Nav.Link className='btn btn-danger' onClick={logout}>
                Log out
              </Nav.Link>
            )}
            <Navbar.Text>{user?.email}</Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
