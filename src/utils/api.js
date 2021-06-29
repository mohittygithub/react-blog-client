const BASE_API = process.env.REACT_APP_SERVER_URI;

/* API PATHS */
export const API = {
  USER_LOGIN_API: `${BASE_API}/users/login`,
  USER_REGISTER_API: `${BASE_API}/users/register`,
};

/* Local PATHS */
export const PATHS = {
  HOME: "/",
  LOGIN: "/login-register",
  PROFILE: "/profile",
  ERROR_PAGE: "/error-page",
};
