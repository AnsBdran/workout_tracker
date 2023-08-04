import { useContext } from 'react';
import { WorkoutContext } from '../context/Workout.context';
import { WorkoutContextType } from '../utils/types';

export const useWorkoutContext = () => {
  const context = useContext<WorkoutContextType>(WorkoutContext);

  if (!context) {
    throw new Error(
      'useWorkoutContext must be used within a WorkoutContextProvider'
    );
  }
  return context;
};
