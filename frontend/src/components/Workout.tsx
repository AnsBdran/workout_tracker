import { useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { BsTrash3 } from 'react-icons/bs';
import { WorkoutType } from '../utils/types';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

type WorkoutProps = {
  workout: WorkoutType;
};

const Workout = ({ workout }: WorkoutProps) => {
  const { dispatch } = useWorkoutContext();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  console.log('single', workout);
  const handleDelete = () => {
    setLoading(true);
    fetch(
      'https://workout-tracker-pbx9.onrender.com/api/workout/' + workout._id,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'WORKOUT_DELETED', payload: data.workout });
        setLoading(false);
      });
  };

  return (
    <Card>
      <Card.Header className='hstack justify-content-between'>
        <h3>{workout.title}</h3>
        <Button variant='danger' onClick={handleDelete} disabled={loading}>
          {loading ? <Spinner as='span' size='sm' /> : <BsTrash3 />}
        </Button>
      </Card.Header>
      <Card.Body>
        <p>
          <strong>load</strong>: {workout.load} Kg
        </p>
        <p>
          <strong>reps:</strong> {workout.reps}
        </p>
      </Card.Body>
    </Card>
  );
};

export default Workout;
