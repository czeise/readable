import * as API from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

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
