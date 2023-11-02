const ActionType = {
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  HIDE_SUCCESS: 'HIDE_SUCCESS',
};

function showSuccessActionCreator(successMessage) {
  return {
    type: ActionType.SHOW_SUCCESS,
    payload: {
      isSuccess: true,
      successMessage,
    },
  };
}

function hideSuccessActionCreator() {
  return {
    type: ActionType.HIDE_SUCCESS,
    payload: {
      isSuccess: false,
      successMessage: '',
    },
  };
}

export {
  ActionType,
  showSuccessActionCreator,
  hideSuccessActionCreator,
};
