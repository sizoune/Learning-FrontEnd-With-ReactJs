const ActionType = {
  SHOW_ERROR: 'SHOW_ERROR',
  HIDE_ERROR: 'HIDE_ERROR',
};

function showErrorActionCreator(errorMessage) {
  return {
    type: ActionType.SHOW_ERROR,
    payload: {
      isError: true,
      errorMessage,
    },
  };
}

function hideErrorActionCreator() {
  return {
    type: ActionType.HIDE_ERROR,
    payload: {
      isError: false,
      errorMessage: '',
    },
  };
}

export {
  ActionType,
  showErrorActionCreator,
  hideErrorActionCreator,
};
