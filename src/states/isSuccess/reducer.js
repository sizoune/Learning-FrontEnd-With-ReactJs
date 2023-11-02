import { ActionType } from './action';

function isSuccessReducer(isSuccess = false, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_SUCCESS:
      return action.payload;
    case ActionType.HIDE_SUCCESS:
      return action.payload;
    default:
      return isSuccess;
  }
}

export default isSuccessReducer;
