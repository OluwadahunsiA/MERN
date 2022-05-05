import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    localStorage.setItem('profile', JSON.stringify(data));
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    localStorage.setItem('profile', JSON.stringify(data));
    history.push('/');
  } catch (err) {
    console.log(err);
  }
};
