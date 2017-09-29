const AUTHORIZATION = process.env.READABLE_SERVER_AUTHORIZATION;
const API = 'http://localhost:3001';

const header = { headers: { 'Authorization': AUTHORIZATION } };

export function getCategories() {
  return fetch(`${API}/categories`, header)
    .then(res => res.json())
    .then(data => data.categories);
}

export function getPosts(category) {
  const url = category ? `${API}/${category}/posts` : `${API}/posts`;

  return fetch(url, header)
    .then(res => res.json());
}

export function getPostDetails(id) {
  return fetch(`${API}/posts/${id}`, header)
    .then(res => res.json());
}

export function getComments(id) {
  return fetch(`${API}/posts/${id}/comments`, header)
    .then(res => res.json());
}

export function getCommentDetails(id) {
  return fetch(`${API}/comments/${id}`, header)
    .then(res => res.json());
}

// TODO Post, Put, and Delete functions
