import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signIn = (formData, history) => async (dispatch) => {
  try {
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};
