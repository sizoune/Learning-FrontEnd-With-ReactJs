/**
 * test scenario for threadsReducer
 *
 * - threadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled up_vote thread when given by TOGGLE_UP_VOTE_THREAD action
 *  - should return the threads with the toggled down_vote thread when given by TOGGLE_DOWN_VOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer.js';

describe('threadsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: '1',
            title: '',
            body: '',
            category: '',
            createdAt: '',
            ownerId: '',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: '2',
            title: '',
            body: '',
            category: '',
            createdAt: '',
            ownerId: '',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: '3',
            title: '',
            body: '',
            category: '',
            createdAt: '',
            ownerId: '',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });
  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: '1',
        title: '',
        body: '',
        category: '',
        createdAt: '',
        ownerId: '',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: '2',
          title: '',
          body: '',
          category: '',
          createdAt: '',
          ownerId: '',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };
      // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });
  it('should return the threads with the toggled up_vote thread when given by TOGGLE_UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: '1',
        title: '',
        body: '',
        category: '',
        createdAt: '',
        ownerId: '',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'TOGGLE_UP_VOTE_THREAD',
      payload: {
        threadId: '1',
        userId: 'user-1',
      },
    };
    // action: up vote
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);
    // action: undo upvote
    const nextState2 = threadsReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });
  it('should return the threads with the toggled down_vote thread when given by TOGGLE_DOWN_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: '1',
        title: '',
        body: '',
        category: '',
        createdAt: '',
        ownerId: '',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'TOGGLE_DOWN_VOTE_THREAD',
      payload: {
        threadId: '1',
        userId: 'user-1',
      },
    };
    // action: up vote
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);
    // action: undo upvote
    const nextState2 = threadsReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });
});
