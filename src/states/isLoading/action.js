const ActionType = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
};

function startLoadingActionCreator() {
  return {
    type: ActionType.START_LOADING,
    payload: {
      isLoading: true,
    },
  };
}

function stopLoadingActionCreator() {
  return {
    type: ActionType.STOP_LOADING,
    payload: {
      isLoading: false,
    },
  };
}

export {
  ActionType,
  stopLoadingActionCreator,
  startLoadingActionCreator,
};
