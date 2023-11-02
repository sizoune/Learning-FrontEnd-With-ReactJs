import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action';
import api from '../../utils/api';
import { showSuccessActionCreator } from '../isSuccess/action';
import { showErrorActionCreator } from '../isError/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(startLoadingActionCreator());
    try {
      await api.register({ name, email, password });
      dispatch(showSuccessActionCreator('Pendaftaran Berhasil!'));
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
    }
    dispatch(stopLoadingActionCreator());
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};
