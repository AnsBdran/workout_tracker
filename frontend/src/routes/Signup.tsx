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
import { useSignup } from '../hooks/useSignup';
import { UserSignFormValuesType } from '../utils/types';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const Signup = () => {
  // useForm hook call
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<UserSignFormValuesType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // useSignup hook call
  const { signup, error, loading } = useSignup();

  // handling submitting the form
  const onSubmit = async (formValues: UserSignFormValuesType) => {
    signup(formValues.email, formValues.password);
  };

  console.log({ signup, error, loading });

  return (
    <section>
      <Row className='justify-content-center'>
        <Col lg='5' sm='8' md='6'>
          <Card className='shadow'>
            <Card.Header>
              <h1>Sign up</h1>
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
                        validate: (email) =>
                          validator.isEmail(email) ||
                          'Please enter a valid email',
                      })}
                      isValid={
                        !errors.email &&
                        dirtyFields.email &&
                        touchedFields.email
                      }
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
                        validate: (password) =>
                          validator.isStrongPassword(password) ||
                          'The password is not strong enough',
                      })}
                      type='password'
                      isValid={
                        !errors.password &&
                        dirtyFields.password &&
                        touchedFields.password
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
                <button className='btn btn-primary px-3'>
                  {loading ? (
                    <Spinner size='sm' animation='border' />
                  ) : (
                    'Sign up'
                  )}
                </button>
              </Card.Footer>
            </Form>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Signup;
