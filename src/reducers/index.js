import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  SORT_BY_VOTES,
  SORT_BY_NEWEST,
  SORT_BY_OLDEST,
  RECEIVE_POST,
  UPDATE_POST,
  RECEIVE_COMMENTS,
  DELETE_POST
} from '../actions';

function categories(state = [], action) {
  const { categories } = action;

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return categories;
    default:
      return state;
  }
}

function posts(state = [], action) {
  let { type, posts, post } = action;
  switch (type) {
    case RECEIVE_POSTS:
      if (posts === undefined) {
        posts = [];
      }
      return posts;
    case SORT_BY_VOTES:
      return [...state].sort(function(a, b) {
        return b.voteScore - a.voteScore;
      });
    case SORT_BY_NEWEST:
      return [...state].sort(function(a, b) {
        return b.timestamp - a.timestamp;
      });
    case SORT_BY_OLDEST:
      return [...state].sort(function(a, b) {
        return a.timestamp - b.timestamp;
      });
    case UPDATE_POST:
      return state.map(oldPost => oldPost.id === post.id ? post : oldPost);
    case RECEIVE_POST:
      if (state.includes(post)) {
        return state.map(oldPost => oldPost.id === post.id ? post : oldPost);
      } else {
        return [...state, post];
      }
    case DELETE_POST:
      return state.map(oldPost => oldPost.id === post.id ? post : oldPost);
    default:
      return state;
  }
}

function comments(state = {}, action) {
  let { type, id, comments } = action;
  switch (type) {
    case RECEIVE_COMMENTS:
      return { ...state, [id]: comments };
    default:
      return state;
  }
}

export default combineReducers({ categories, posts, comments });
