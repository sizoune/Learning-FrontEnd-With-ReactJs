import React from 'react';
import { MdOutlineForum } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import Loading from './Loading.jsx';
import Grid from './styled/Grid.js';

function AuthLayout() {
  return (
    <>
      <Loading />
      <Grid>
        <div className="flex flex-col items-center justify-center">
          <MdOutlineForum className="w-80 h-auto dark:text-white" />
        </div>
        <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
          <Outlet />
        </div>
      </Grid>
    </>
  );
}

export default AuthLayout;
