import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../routes/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />} path='/'>
      <Route index element={<Home />} />
    </Route>
  )
);

export default router;
