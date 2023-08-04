import React, { useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { BsTrash3 } from 'react-icons/bs';
import { WorkoutType } from '../utils/types';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

type WorkoutProps = {
  workout: WorkoutType;
};

const Workout = ({ workout }: WorkoutProps) => {
  const { dispatch } = useWorkoutContext();
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    setLoading(true);
    fetch('http://localhost:8080/workout/' + workout._id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'WORKOUT_DELETED', payload: data });
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