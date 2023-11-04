import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unsetAuthUserActionCreator } from '../states/authUser/action.js';

function ProfilePage() {
  const {
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  return (
    <section>
      <div className="flex flex-col items-center p-10">
        <img className="w-60 h-60 mb-3 rounded-full shadow-lg" src={authUser.avatar} alt="Bonnie image" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{authUser.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{authUser.email}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <a onClick={() => dispatch(unsetAuthUserActionCreator())} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">Log Out</a>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
