import React from 'react';

export type WorkoutType = {
  _id: string;
  createdAt: string;
  load: number;
  reps: number;
  title: string;
  updatedAt: string;
  _v: number;
};

export type WorkoutFormDataType = {
  title: string;
  load: number;
  reps: number;
};

export type UserType = { email: string; token: string };

// WorkoutContext types

type SetInitialWorkouts = {
  type: 'SET_INITIAL_WORKOUTS';
  payload: WorkoutType[];
};

type WorkoutAddedAction = {
  type: 'WORKOUT_ADDED';
  payload: WorkoutType;
};

type WorkoutDeletedAction = {
  type: 'WORKOUT_DELETED';
  payload: WorkoutType;
};

export type WorkoutActionsType =
  | WorkoutAddedAction
  | WorkoutDeletedAction
  | SetInitialWorkouts;

export type WorkoutContextType = {
  workouts: WorkoutType[];
  dispatch: React.Dispatch<WorkoutActionsType>;
};

export type UserSignFormValuesType = {
  email: string;
  password: string;
};
