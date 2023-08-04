import Workouts from '../components/Workouts';
import WorkoutForm from '../components/WorkoutForm';
import { Col, Row } from 'react-bootstrap';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Home = () => {
  const { workouts } = useWorkoutContext();

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
