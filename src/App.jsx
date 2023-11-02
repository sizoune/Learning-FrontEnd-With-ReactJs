import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements, Navigate, Outlet, Route, RouterProvider,
} from 'react-router-dom';
import { asyncPreloadProcess } from './states/isPreload/action.js';
import { asyncUnsetAuthUser } from './states/authUser/action.js';
import AuthLayout from './components/AuthLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MainLayout from './components/MainLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <RouterProvider router={
        createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={authUser === null ? <AuthLayout /> : <MainLayout />}>
              <Route element={authUser === null ? <Outlet /> : <Navigate to="/" />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>

              <Route element={authUser !== null ? <Outlet /> : <Navigate to="/login" />}>
                <Route index element={<DashboardPage />} />

                {/* <Route path='archive' element={<ArchivesPage />} /> */}
                {/* <Route path='notes/:id' element={<Detail />} /> */}
                {/* <Route path='new' element{<AddNote />} /> */}
              </Route>
            </Route>,
          ),
        )
      }
    />
  );
}

export default App;
