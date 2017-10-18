import { combineReducers } from 'redux';

import { RECEIVE_CATEGORIES, RECEIVE_POSTS } from '../actions';

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
  let { posts } = action;
  console.log(`posts reducer input posts: ${posts}`);

  switch (action.type) {
    case RECEIVE_POSTS:
      if (posts === undefined) {
        posts = [];
      }
      return posts;
    default:
      return state;
  }
}

export default combineReducers({ categories, posts });
