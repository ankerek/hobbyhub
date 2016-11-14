import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../utils/api';
import categorySchema from '../schemas/category';
import * as actions from '../actions/categories';

function* fetchCategories() {
  try {
    const payload = yield call(api.fetch, '/api/categories', { method: 'GET' });
    yield put(actions.fetchCategoriesSuccess(normalize(payload, arrayOf(categorySchema))));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchCategoriesFailure());
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchFetchCategories() {
  yield* takeLatest(actions.FETCH_CATEGORIES_REQUEST, fetchCategories);
}

//=====================================
//  ROOT
//-------------------------------------

const categoriesSagas = [
  fork(watchFetchCategories),
];

export default categoriesSagas;
