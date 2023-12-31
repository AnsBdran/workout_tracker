import Workout from './Workout';
import { WorkoutType } from '../utils/types';
import { Alert, Col, Row } from 'react-bootstrap';

type WorkoutsProps = {
  workouts: WorkoutType[];
};

const Workouts = ({ workouts }: WorkoutsProps) => {
  return (
    <section>
      <h1 className='mb-4 display-5 text-primary fw-semibold'>
        Existed Workouts
      </h1>
      <Row className='justify-content-start'>
        <Col className='gap-4 d-inline-flex flex-column' xl={10}>
          {workouts.length ? (
            workouts.map((workout) => (
              <Workout key={workout._id} workout={workout} />
            ))
          ) : (
            <div>
              <Alert variant='info'>You have no workouts added!</Alert>
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default Workouts;
