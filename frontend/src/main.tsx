import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkoutContextProvider from './context/Workout.context.tsx';
import { AuthContextProvider } from './context/Auth.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
