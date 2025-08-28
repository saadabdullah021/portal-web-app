import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_ERROR,
  SET_CREDENTIALS
} from '../actions/authActions';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null
      };
    
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
    
    case LOGOUT_START:
      return {
        ...state,
        loading: true
      };
    
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null
      };
    
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case SET_CREDENTIALS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      };
    
    default:
      return state;
  }
};

export default authReducer;
