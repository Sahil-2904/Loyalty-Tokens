// // authReducer.js
// const initialState = {
//     isAuthenticated: false,
//   };

//   const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_AUTHENTICATED':
//         return {
//           ...state,
//           isAuthenticated: action.payload,
//         };
//       default:
//         return state;
//     }
//   };

//   export default authReducer;

import { LOGIN_SUCCESS, LOGOUT, WALLET, DISCONNECT, TOKENS } from './authActions';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  connected:false,
  tokens:0
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload,
        connected:false
      };
    case WALLET:
      return {
        ...state,
        connected:true
      }
    case DISCONNECT:
      return{
        ...state,
        connected:false
      }
    case TOKENS:
      return{
        ...state,
        tokens:action.payload
      }
    default:
      return state;
  }
};

export default authReducer;
