import { createContext, useEffect, useReducer } from 'react';

type UserType = { email: string; token: string };
type AuthContextProviderPropsType = {
  children: React.ReactNode;
};

type InitialStateType = UserType | null;

type LoginAction = {
  type: 'LOGIN';
  payload: UserType;
};

type LogoutAction = {
  type: 'LOGOUT';
};

type AuthReducerActionsType = LoginAction | LogoutAction;

type AuthContextType = {
  user: UserType | null;
  dispatch: React.Dispatch<AuthReducerActionsType>;
};

const initialState: InitialStateType = null;

const authReducer = (
  state: InitialStateType,
  action: AuthReducerActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = ({
  children,
}: AuthContextProviderPropsType) => {
  const [user, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ dispatch, user }}>
      {children}
    </AuthContext.Provider>
  );
};
