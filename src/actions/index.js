import * as API from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_BY_VOTES = 'SORT_BY_VOTES';
export const SORT_BY_NEWEST = 'SORT_BY_NEWEST';
export const SORT_BY_OLDEST = 'SORT_BY_OLDEST';

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  };
}

export function fetchCategories() {
  return dispatch => {
    return API.getCategories()
      .then(categories => dispatch(receiveCategories(categories)));
  };
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function fetchPosts(category) {
  console.log(`fetchPosts category: ${category}`);
  return dispatch => {
    return API.getPosts(category)
      .then(function(posts) {
        dispatch(receivePosts(posts));
      });
  };
}

export function sortByVotes(posts) {
  return {
    type: SORT_BY_VOTES,
    posts
  };
}

export function sortByNewest(posts) {
  return {
    type: SORT_BY_NEWEST,
    posts
  };
}

export function sortByOldest(posts) {
  return {
    type: SORT_BY_OLDEST,
    posts
  };
}
