import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../actionTypes";

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, loginInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, registerInfo: action.payload };
    case USER_REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { state };
  }
};
