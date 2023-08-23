import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../routes/Home';
import Signup from '../routes/Signup';
import Login from '../routes/Login';
import Redirect from './Redirect';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />} path='/'>
      <Route
        index
        element={
          <Redirect>
            <Home />
          </Redirect>
        }
      />
      <Route
        path='signup'
        element={
          <Redirect>
            <Signup />
          </Redirect>
        }
      />
      <Route
        path='login'
        element={
          <Redirect>
            <Login />
          </Redirect>
        }
      />
    </Route>
  )
);

export default router;
