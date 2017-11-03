import uuid from 'uuid/v4';

const AUTHORIZATION = process.env.READABLE_SERVER_AUTHORIZATION;
const API = 'http://localhost:3001';

const headers = { 'Authorization': AUTHORIZATION };

export function getCategories() {
  const url = `${API}/categories`;

  return fetch(url, { headers })
    .then(res => res.json())
    .then(data => data.categories);
}

export function getPosts(category) {
  const url = category ? `${API}/${category}/posts` : `${API}/posts`;

  return fetch(url, { headers })
    .then(res => res.json());
}

export function getPost(id) {
  const url = `${API}/posts/${id}`;

  return fetch(url, { headers })
    .then(res => res.json());
}

export function getComments(id) {
  const url = `${API}/posts/${id}/comments`;

  return fetch(url, { headers })
    .then(res => res.json());
}

export function getComment(id) {
  const url = `${API}/comments/${id}`;

  return fetch(url, { headers })
    .then(res => res.json());
}

export function vote(type, id, vote) {
  const url = `${API}/${type}/${id}`;

  return fetch(
    url,
    {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ option: vote })
    }
  ).then(res => res.json());
}

export function editPost(id, title, body) {
  const url = `${API}/posts/${id}`;

  return fetch(
    url,
    {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, body: body })
    }
  ).then(res => res.json());
}

export function newComment(body, author, parentId) {
  const url = `${API}/comments`;

  return fetch(
    url,
    {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: uuid(), timestamp: Date.now(), parentId: parentId, author: author, body: body })
    }
  ).then(res => res.json());
}

export function editComment(id, body) {
  const url = `${API}/comments/${id}`;

  return fetch(
    url,
    {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: Date.now(), body: body })
    }
  ).then(res => res.json());
}
