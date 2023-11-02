import { ActionType } from './action';

function isErrorReducer(isError = false, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_ERROR:
      return action.payload;
    case ActionType.HIDE_ERROR:
      return action.payload;
    default:
      return isError;
  }
}

export default isErrorReducer;
