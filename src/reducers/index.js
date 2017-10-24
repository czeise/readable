import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  SORT_BY_VOTES,
  SORT_BY_NEWEST,
  SORT_BY_OLDEST
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
  let { type, posts } = action;
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
    default:
      return state;
  }
}

export default combineReducers({ categories, posts });
