import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddlewware from 'redux-thunk';
import axios from 'axios';

const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const GET_USER = 'GET_USER';

const getAccessToken = (token) => ({
  type: GET_ACCESS_TOKEN,
  token,
});

const getUser = (user) => ({
  type: GET_USER,
  user,
});

export const getAccessTokenThunk = (token) => {
  return (dispatch) => {
    dispatch(getAccessToken(token));
  };
};

export const getUserThunk = () => {
  const accessToken = store.getState().token;
  return async (dispatch) => {
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    dispatch(getUser(data));
  };
};

const token = (state = '', action) => {
  switch (action.type) {
    case GET_ACCESS_TOKEN:
      return action.token;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};

const reducer = combineReducers({
  token,
  user,
});

const store = createStore(reducer, applyMiddleware(thunkMiddlewware));
export default store;
