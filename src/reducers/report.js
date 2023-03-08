import { USER_LOADED, ADD_POST } from "../actions/types";

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: null,
  reportInfo: { date_time: '', report_html: null },
  error: {},
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case ADD_POST:
      return {
        ...state,
        reportInfo:payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default postReducer;
