import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { showErrorActionCreator } from '../isError/action.js';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(startLoadingActionCreator());
    try {
      // preload process
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // fallback process
      dispatch(setAuthUserActionCreator(null));
      dispatch(showErrorActionCreator(error.message));
    } finally {
      // end preload process
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(stopLoadingActionCreator());
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};
