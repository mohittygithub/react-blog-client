import axios from "axios";
import { API } from "../../utils/api";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../actionTypes";

/* User Login Action */
export const loginAction = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  try {
    const { data } = await axios.post(`${API.USER_LOGIN_API}`, {
      email,
      password,
    });
    // console.log("data=>", data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    console.log(data);
    localStorage.setItem("loginInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/* User Register Action */
export const registerAction =
  (name, profileImage, email, password) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    try {
      const { data } = await axios.post(`${API.USER_REGISTER_API}`, {
        name,
        profileImage,
        email,
        password,
      });
      // console.log("data=>", data);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
