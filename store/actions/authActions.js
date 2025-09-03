import axios from '../../lib/axios';

export const LOGIN_START = 'auth/loginStart';
export const LOGIN_SUCCESS = 'auth/loginSuccess';
export const LOGIN_FAILURE = 'auth/loginFailure';
export const LOGOUT_START = 'auth/logoutStart';
export const LOGOUT_SUCCESS = 'auth/logoutSuccess';
export const LOGOUT_FAILURE = 'auth/logoutFailure';
export const CLEAR_ERROR = 'auth/clearError';
export const SET_CREDENTIALS = 'auth/setCredentials';

export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logoutStart = () => ({
  type: LOGOUT_START
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const setCredentials = (credentials) => ({
  type: SET_CREDENTIALS,
  payload: credentials
});

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  
  try {
    const response = await axios.post('/auth/login', credentials);
    const data = response.data;
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutStart());
  
  try {
    await axios.post('/auth/logout');
    
    localStorage.removeItem('authToken');
    
    dispatch(logoutSuccess());
  } catch (error) {
    localStorage.removeItem('authToken');
    dispatch(logoutFailure(error.message));
  }
};
