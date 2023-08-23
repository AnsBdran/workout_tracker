import {
  Alert,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { useLogin } from '../hooks/useLogin';
import { UserSignFormValuesType } from '../utils/types';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const Login = () => {
  const {
    register,
    formState: { isDirty, errors, touchedFields, dirtyFields },
    handleSubmit,
  } = useForm<UserSignFormValuesType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const { login, error, loading } = useLogin();
  const onSubmit = async (formValues: UserSignFormValuesType) => {
    login(formValues.email, formValues.password);
  };
  return (
    <section>
      <Row className='justify-content-center'>
        <Col lg='5' sm='8' md='6'>
          <Card className='shadow'>
            <Card.Header>
              <h1>Login</h1>
            </Card.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Card.Body className='vstack gap-3'>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <MdOutlineMailOutline />
                    </InputGroup.Text>
                    <Form.Control
                      {...register('email', {
                        required: 'Required field',
                        validate: (email) =>
                          validator.isEmail(email) || 'Enter a valid email',
                      })}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <RiLockPasswordLine />
                    </InputGroup.Text>
                    <Form.Control
                      {...register('password', {
                        required: 'Required field',
                        validate: (password) =>
                          validator.isStrongPassword(password) ||
                          'The password is not strong enough',
                      })}
                      type='password'
                      isValid={
                        !errors.password &&
                        touchedFields.password &&
                        dirtyFields.password
                      }
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                {error && <Alert variant='danger'>{error}</Alert>}
              </Card.Body>
              <Card.Footer>
                <button
                  className='btn btn-primary align-self-start px-3'
                  disabled={loading}
                >
                  {loading ? <Spinner size='sm' /> : 'Log in'}
                </button>
              </Card.Footer>
            </Form>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
