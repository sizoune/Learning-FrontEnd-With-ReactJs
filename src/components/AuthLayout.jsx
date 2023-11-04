import React from 'react';
import { MdOutlineForum } from 'react-icons/md';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <section className="grid lg:grid-cols-2 sm:grid-cols-1">
      <div className="flex flex-col items-center justify-center">
        <MdOutlineForum className="w-80 h-auto dark:text-white" />
      </div>
      <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
        <Outlet />
      </div>
    </section>
  );
}

export default AuthLayout;
