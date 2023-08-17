// // authActions.js
// export const setAuthenticated = (isAuthenticated) => {
//     return {
//       type: 'SET_AUTHENTICATED',
//       payload: isAuthenticated,
//     };
//   };
// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Action creators
export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload:null
  };
};
  