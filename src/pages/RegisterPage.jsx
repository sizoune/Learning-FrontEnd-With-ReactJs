import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineForum } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action.js';
import RegisterInput from '../components/RegisterInput.jsx';
import { hideSuccessActionCreator } from '../states/isSuccess/action.js';
import SuccessDialog from '../components/SuccessDialog.jsx';
import ErrorDialog from '../components/ErrorDialog.jsx';
import { hideErrorActionCreator } from '../states/isError/action.js';

function RegisterPage() {
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((states) => states);
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    // @TODO: dispatch async action to register
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  const onSuccessClosed = () => {
    dispatch(hideSuccessActionCreator());
    navigate('/login');
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
      <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <MdOutlineForum className="w-8 h-8 mr-2" />
        My Forum App
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register your account to start sharing!
          </h1>
          <RegisterInput isLoading={isLoading} register={onRegister} />
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
