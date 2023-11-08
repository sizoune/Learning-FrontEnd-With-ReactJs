/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success and dispatch preload process in the end
 *  - should dispatch error action when data fetching failed and dispatch preload process in the end
 */
import {
  describe, it, expect, beforeEach, afterEach, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api.js';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action.js';
import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action.js';
import { setAuthUserActionCreator } from '../authUser/action.js';
import { showErrorActionCreator } from '../isError/action.js';

const fakeOwnProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success and dispatch preload process in the end', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.resolve(fakeOwnProfileResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(startLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeOwnProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(stopLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch error action when data fetching failed and dispatch preload process in the end', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(startLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(showErrorActionCreator(fakeErrorResponse.message));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(stopLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
