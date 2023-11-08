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
import ProfilePage from './pages/ProfilePage.jsx';
import NewThreadPage from './pages/NewThreadPage.jsx';
import ThreadDetailPage from './pages/ThreadDetailPage.jsx';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

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
                <Route path="/" element={authUser === null ? <AuthLayout /> : <MainLayout onUserClick={onSignOut} />}>
                  <Route element={authUser === null ? <Outlet /> : <Navigate to="/" />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Route>

                  <Route element={authUser === null && <Navigate to="/login" />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="/user/me" element={<ProfilePage />} />
                    <Route path="/new_thread" element={<NewThreadPage />} />
                    <Route path="/threads/:id" element={<ThreadDetailPage />} />
                  </Route>
                </Route>,
              ),
            )
        }
    />
  );
}

export default App;
