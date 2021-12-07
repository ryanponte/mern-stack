import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
  PROFILE_ERROR,
} from './types';

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post('/profile', formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          edit ? 'Profile Updated' : 'Profile Created',
          'success'
        )
      );

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'danger'))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
