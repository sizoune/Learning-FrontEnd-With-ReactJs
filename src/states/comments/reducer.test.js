/**
 * test scenario for commentsReducer
 *
 * - commentsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the comments when given by RECEIVE_COMMENTS action
 *  - should return the comments with the new comment when given by ADD_COMMENT action
 *  - should return the comments with the toggled up_vote comment when given by TOGGLE_UP_VOTE_COMMENT action
 *  - should return the comments with the toggled down_vote comment when given by TOGGLE_DOWN_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import commentsReducer from './reducer.js';

describe('commentsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = commentsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the comments when given by RECEIVE_COMMENTS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_COMMENTS',
      payload: {
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
          {
            id: 'comment-2',
            content: 'Ini adalah komentar kedua',
            createdAt: '2021-06-22T07:00:00.000Z',
            owner: {
              id: 'users-2',
              name: 'John Doe2',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.comments);
  });
  it('should return the comments with the new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Ini adalah komentar kedua',
          createdAt: '2021-06-22T07:00:00.000Z',
          owner: {
            id: 'users-2',
            name: 'John Doe2',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };
    // action
    const nextState = commentsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.comment, ...initialState]);
  });
  it('should return the comments with the toggled up_vote comment when given by TOGGLE_UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'TOGGLE_UP_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote
    const nextState = commentsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);
    // action: undo upvote
    const nextState2 = commentsReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });
  it('should return the comments with the toggled down_vote comment when given by TOGGLE_DOWN_VOTE_COMMENT action', () => {
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'TOGGLE_DOWN_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote
    const nextState = commentsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);
    // action: undo upvote
    const nextState2 = commentsReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });
});
