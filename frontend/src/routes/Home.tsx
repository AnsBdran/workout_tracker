import Workouts from '../components/Workouts';
import WorkoutForm from '../components/WorkoutForm';
import { Col, Row } from 'react-bootstrap';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  console.log('the ', workouts);

  useEffect(() => {
    fetch('http://localhost:8080/api/workout', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.workouts) {
          console.log('form db', data.workouts);
          dispatch({ type: 'SET_INITIAL_WORKOUTS', payload: data.workouts });
        }
      });
  }, [user]);

  return (
    <>
      <Row className='justify-content-around'>
        <Col md={7}>
          <Workouts workouts={workouts} />
        </Col>
        <Col md={5} lg={4}>
          <WorkoutForm />
        </Col>
      </Row>
    </>
  );
};

export default Home;
