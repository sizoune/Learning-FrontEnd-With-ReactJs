import React from 'react';
import { MdOutlineForum } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorDialog from './ErrorDialog.jsx';
import SuccessDialog from './SuccessDialog.jsx';

function AuthLayout({
  error, onErrorClose, success, onSuccessClosed,
}) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 grid lg:grid-cols-2 sm:grid-cols-1">
      {error.isError && (
        <ErrorDialog
          onClose={onErrorClose}
          errorMessage={error.errorMessage}
        />
      )}
      {success.isSuccess && (
        <SuccessDialog
          onClose={onSuccessClosed}
          successMessage={success.successMessage}
        />
      )}
      <div className="flex flex-col items-center justify-center">
        <MdOutlineForum className="w-80 h-auto dark:text-white" />
      </div>
      <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
        <Outlet />
      </div>
    </section>
  );
}

const errorItemPropTypes = {
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const successItemPropTypes = {
  isSuccess: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
};

AuthLayout.propTypes = {
  error: PropTypes.shape(errorItemPropTypes).isRequired,
  onErrorClose: PropTypes.func.isRequired,
  success: PropTypes.shape(successItemPropTypes).isRequired,
  onSuccessClosed: PropTypes.func.isRequired,
};

export default AuthLayout;
