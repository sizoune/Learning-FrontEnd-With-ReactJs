import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewThreadInput from '../components/NewThreadInput.jsx';
import { asyncAddThread } from '../states/threads/action.js';
import ErrorDialog from '../components/ErrorDialog.jsx';
import { hideErrorActionCreator } from '../states/isError/action.js';
import { hideSuccessActionCreator } from '../states/isSuccess/action.js';
import SuccessDialog from '../components/SuccessDialog.jsx';

function NewThreadPage() {
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);
  const success = useSelector((state) => state.success);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onSuccessClosed = () => {
    dispatch(hideSuccessActionCreator());
    navigate('/');
  };

  return (
    <>
      {success.isSuccess && (
      <SuccessDialog
        onClose={onSuccessClosed}
        successMessage={success.successMessage}
      />
      )}
      {error.isError && (
      <ErrorDialog
        onClose={() => dispatch(hideErrorActionCreator())}
        errorMessage={error.errorMessage}
      />
      )}
      <NewThreadInput onSubmit={onAddThread} isLoading={isLoading} />
    </>
  );
}

export default NewThreadPage;
