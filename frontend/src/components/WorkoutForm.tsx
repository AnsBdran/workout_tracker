import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  InputGroup,
  Spinner,
  Stack,
} from 'react-bootstrap';
import { UseFormReturn, useForm } from 'react-hook-form';
import { WorkoutFormDataType } from '../utils/types';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, dirtyFields },
  }: UseFormReturn<WorkoutFormDataType> = useForm();
  const { user } = useAuthContext();
  const onSubmit = (formValues: WorkoutFormDataType) => {
    console.log('form values', formValues);
    setLoading(true);
    fetch('https://workout-tracker-pbx9.onrender.com/api/workout', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.workout) {
          dispatch({ type: 'WORKOUT_ADDED', payload: data.workout });
          reset();
        }
        setLoading(false);

        console.log('res', data);
      });
  };

  return (
    <section className=''>
      <Card>
        <Card.Header>
          <h2 className='display-6 text-primary fw-semibold'>
            Add a New Workout
          </h2>
        </Card.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body>
            <Stack gap={3}>
              <Form.Group controlId='title'>
                <Form.Label>Exercise Title:</Form.Label>
                <Form.Control
                  {...register('title', {
                    required: 'Required field',
                  })}
                  isValid={
                    !errors?.title && touchedFields.title && dirtyFields.title
                  }
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='load'>
                <Form.Label>Load:</Form.Label>
                <InputGroup>
                  <InputGroup.Text>Kg</InputGroup.Text>
                  <Form.Control
                    placeholder=''
                    type='number'
                    {...register('load', {
                      required: 'You must specify the load weight',
                    })}
                    isValid={
                      !errors.load && touchedFields.load && dirtyFields.load
                    }
                    isInvalid={!!errors.load}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.load?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId='reps'>
                <Form.Label>Reps:</Form.Label>
                <Form.Control
                  type='number'
                  {...register('reps', {
                    required:
                      'please specify the number of exercise repetitions',
                  })}
                  isValid={
                    !errors.reps && touchedFields.reps && dirtyFields.reps
                  }
                  isInvalid={!!errors.reps}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.reps?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button
              type='submit'
              className='align-self-start '
              disabled={loading}
            >
              {loading ? (
                <Spinner as='span' size='sm' />
              ) : (
                <span> Add workout</span>
              )}
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </section>
  );
};
{
  /* <Card>
          <Stack gap={3}>
            <Form.Group controlId='title'>
              <Form.Label>Exercise Title:</Form.Label>
              <Form.Control
                placeholder=''
                {...register('title', {
                  required: 'Required field',
                })}
                isValid={
                  !errors?.title && touchedFields.title && dirtyFields.title
                }
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='load'>
              <Form.Label>Load:</Form.Label>
              <InputGroup>
                <InputGroup.Text>Kg</InputGroup.Text>
                <Form.Control
                  placeholder=''
                  type='number'
                  {...register('load', {
                    required: 'You must specify the load weight',
                  })}
                  isValid={
                    !errors.load && touchedFields.load && dirtyFields.load
                  }
                  isInvalid={!!errors.load}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.load?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId='reps'>
              <Form.Label>Reps:</Form.Label>
              <Form.Control
                type='number'
                {...register('reps', {
                  required: 'please specify the number of exercise repetitions',
                })}
                isValid={!errors.reps && touchedFields.reps && dirtyFields.reps}
                isInvalid={!!errors.reps}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.reps?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type='submit' className='align-self-start'>
              Add workout
            </Button>
          </Stack>
        </Card> */
}

export default WorkoutForm;
