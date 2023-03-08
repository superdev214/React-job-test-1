import api from '../utils/api';
import { setAlert } from './alert';
import {
  POST_ERROR,
  ADD_POST,
  ADD_COMMENT,
  USER_LOADED,
  AUTH_ERROR,
  REMOVE_COMMENT
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/
// Check session and Load User to store

// Get posts


// Add post
export const addPost = (formData) => async (dispatch) => {
  const content = new FormData();
  content.append('number_value',formData.num);
  content.append('image',formData.imageFile);
  try {
    const res = await api.post('/app/report', content);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post


