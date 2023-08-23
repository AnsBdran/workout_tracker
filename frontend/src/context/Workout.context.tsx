import { ReactNode, createContext, useEffect, useReducer } from 'react';
import {
  WorkoutActionsType,
  WorkoutContextType,
  WorkoutType,
} from '../utils/types';
import { useAuthContext } from '../hooks/useAuthContext';

type WorkoutContextProviderPropsType = {
  children: ReactNode;
};
type InitialStateType = WorkoutType[] | [];

const workoutReducer = (
  state: InitialStateType,
  action: WorkoutActionsType
) => {
  switch (action.type) {
    case 'SET_INITIAL_WORKOUTS':
      return action.payload;
    case 'WORKOUT_ADDED':
      return [...state, action.payload];
    case 'WORKOUT_DELETED':
      return state.filter((w) => w._id !== action.payload._id);
    default:
      return state;
  }
};

export const WorkoutContext = createContext<WorkoutContextType>(
  {} as WorkoutContextType
);
const WorkoutContextProvider = ({
  children,
}: WorkoutContextProviderPropsType) => {
  const [workouts, dispatch] = useReducer(workoutReducer, []);

  return (
    <WorkoutContext.Provider value={{ workouts, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContextProvider;
