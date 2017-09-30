const AUTHORIZATION = process.env.READABLE_SERVER_AUTHORIZATION;
const API = 'http://localhost:3001';

const header = { headers: { 'Authorization': AUTHORIZATION } };

export function getCategories() {
  const url = `${API}/categories`;

  return fetch(url, header)
    .then(res => res.json())
    .then(data => data.categories);
}

export function getPosts(category) {
  const url = category ? `${API}/${category}/posts` : `${API}/posts`;

  return fetch(url, header)
    .then(res => res.json());
}

export function getPost(id) {
  const url = `${API}/posts/${id}`;

  return fetch(url, header)
    .then(res => res.json());
}

export function getComments(id) {
  const url = `${API}/posts/${id}/comments`;

  return fetch(url, header)
    .then(res => res.json());
}

export function getComment(id) {
  const url = `${API}/comments/${id}`;

  return fetch(url, header)
    .then(res => res.json());
}

// TODO Post, Put, and Delete functions
