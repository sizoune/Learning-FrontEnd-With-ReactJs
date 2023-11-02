import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineForum } from 'react-icons/md';
import { asyncSetAuthUser } from '../states/authUser/action.js';
import LoginInput from '../components/LoginInput.jsx';

function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((states) => states);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <>
      <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <MdOutlineForum className="w-8 h-8 mr-2" />
        My Forum App
      </a>
      <div
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <LoginInput isLoading={isLoading} login={onLogin} />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
