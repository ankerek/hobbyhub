export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const fetchCategories = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const fetchCategoriesSuccess = (payload) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload,
});

export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const fetchCategoriesFailure = ({ error }) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error },
});