import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const res = await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return setLoading(false);
    }

    dispatch({ type: 'LOGIN', payload: data });
    localStorage.setItem('user', JSON.stringify(data));
    setLoading(false);
  };

  return { signup, loading, error };
};
