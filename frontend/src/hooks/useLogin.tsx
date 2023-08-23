import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log('finished', data);

    if (data.error) {
      setError(data.error);
      return setLoading(false);
    }

    dispatch({ type: 'LOGIN', payload: data });
    localStorage.setItem('user', JSON.stringify(data));
    setLoading(false);
  };

  return { login, loading, error };
};
