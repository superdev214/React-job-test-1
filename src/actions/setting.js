import api from "../utils/api";
import { setAlert } from "./alert";
import {
  LOAD_SETTINGS_ERROR,
  SETTINGS_LOADED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_TABLE,
  LOAD_TABLE_ERROR,
} from "./types";

// Check session and Load User to store
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/session", { withCredentials: true });

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//When the first site loading, all settings are loaded.
export const loadSettings = () => async (dispatch) => {
  try {
    const res = await api.get("/app/settings");

    dispatch({
      type: SETTINGS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_SETTINGS_ERROR,
    });
  }
};
export const loadTable = () => async (dispatch) => {
  try {
    const res = await api.get("/app/tableData", {
      withCredentials: true,
    });
    dispatch({
      type: LOAD_TABLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_TABLE_ERROR,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { username: email, password };

  try {
    const res = await api.post("/users/login", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
    dispatch(loadTable());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    const res = await api.get("/users/logout");
    if (res) {
      dispatch({
        type: LOGOUT,
      });
      window.history.go("/login");
    }
  } catch (err) {}
};
