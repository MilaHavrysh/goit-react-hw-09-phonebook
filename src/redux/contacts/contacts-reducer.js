import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  SubmitContactRequest,
  SubmitContactSuccess,
  SubmitContactError,
  DeleteContactRequest,
  DeleteContactSuccess,
  DeleteContactError,
  FetchContactsRequest,
  FetchContactsSuccess,
  FetchContactsError,
} from './contacts-actions';

const Submit = (state, { payload }) => {
  let arrayName = state.map(elem => elem.name).find(el => el === payload.name);
  if (arrayName === undefined) {
    return [payload, ...state];
  } else {
    alert(`${payload.name} уже есть в книге`);
    return state;
  }
};

const items = createReducer([], {
  [FetchContactsSuccess]: (_, action) => action.payload,
  [DeleteContactSuccess]: (state, action) =>
    state.filter(contact => contact.id !== action.payload),
  [SubmitContactSuccess]: (state, action) => Submit(state, action),
});
const filter = createReducer('', {
  'Filter/SetFilter': (_, action) => action.payload.toLowerCase(),
});

const loading = createReducer(false, {
  [SubmitContactRequest]: () => true,
  [SubmitContactSuccess]: () => false,
  [SubmitContactError]: () => false,
  [DeleteContactRequest]: () => true,
  [DeleteContactSuccess]: () => false,
  [DeleteContactError]: () => false,
  [FetchContactsRequest]: () => true,
  [FetchContactsSuccess]: () => false,
  [FetchContactsError]: () => false,
});

export default combineReducers({
  items,
  filter,
  loading,
});
