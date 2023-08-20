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
export const WALLET = 'WALLET';
export const DISCONNECT = 'DISCONNECT';
export const TOKENS = 'TOKENS';

// Action creators
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
  payload: null,
});

export const wallet = () => ({
  type: WALLET,
  payload: null,
});

export const disconnectWallet = () => ({
  type: DISCONNECT,
  payload: null,
})

export const tokens = (token) => ({
  type: TOKENS,
  payload: token,
})