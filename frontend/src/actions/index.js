import * as API from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_BY_VOTES = 'SORT_BY_VOTES';
export const SORT_BY_NEWEST = 'SORT_BY_NEWEST';
export const SORT_BY_OLDEST = 'SORT_BY_OLDEST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

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
  return dispatch => {
    return API.getPosts(category)
      .then(function(posts) {
        dispatch(receivePosts(posts));
      });
  };
}

export function receiveComments(id, comments) {
  return {
    type: RECEIVE_COMMENTS,
    id,
    comments
  };
}

export function fetchComments(id) {
  return dispatch => {
    return API.getComments(id)
      .then(function(comments) {
        dispatch(receiveComments(id, comments));
      });
  };
}

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post
  };
}

export function fetchPost(id) {
  return dispatch => {
    return API.getPost(id)
      .then(function(post) {
        dispatch(receivePost(post));
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

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  };
}

export function postVote(id, vote) {
  return dispatch => {
    return API.vote('posts', id, vote)
      .then(res => dispatch(updatePost(res)));
  };
}

export function editPost(id, title, body) {
  return dispatch => {
    return API.editPost(id, title, body)
      .then(post => dispatch(updatePost(post)));
  };
}

export function newComment(body, author, parentId) {
  return dispatch => {
    return API.newComment(body, author, parentId)
      .then(() => dispatch(fetchPosts()))
      .then(() => dispatch(fetchComments(parentId)));
  };
}

export function commentVote(id, vote) {
  return dispatch => {
    return API.vote('comments', id, vote)
      .then(res => dispatch(fetchComments(res.parentId)));
  };
}

export function editComment(id, body) {
  return dispatch => {
    return API.editComment(id, body)
      .then(comment => dispatch(fetchComments(comment.parentId)));
  };
}

export function deletePost(id) {
  return dispatch => {
    return API.deletePost(id)
      .then(() => dispatch(fetchPosts()));
  };
}

export function deleteComment(comment) {
  return dispatch => {
    return API.deleteComment(comment.id)
      .then(() => dispatch(fetchPosts()))
      .then(() => dispatch(fetchComments(comment.parentId)));
  };
}

export function addPost(title, body, author, category) {
  return dispatch => {
    return API.addPost(title, body, author, category)
      .then(() => dispatch(fetchPosts()));
  };
}
