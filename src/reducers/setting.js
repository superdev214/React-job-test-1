import {
  SETTINGS_LOADED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOAD_TABLE,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  setting: null,
  table:{
    datetime: '',
    tabledata: []
  }
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case SETTINGS_LOADED:
      console.log(payload);
      return {
        ...state,
        isAuthenticated:false,
        loading:true,
        setting:payload
      }
    case LOAD_TABLE:
      return {
        ...state,
        isAuthenticated:true,
        loading:false,
        table:payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        table: null
      };
    default:
      return state;
  }
}

export default authReducer;
