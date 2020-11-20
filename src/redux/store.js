import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddlewware from 'redux-thunk';
import axios from 'axios';

const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const GET_USER = 'GET_USER';
const GET_PLAYLISTS = 'GET_PLAYLISTS';
const GET_PLAYLIST = 'GET_PLAYLIST';

const getAccessToken = (token) => ({
  type: GET_ACCESS_TOKEN,
  token,
});

const getUser = (user) => ({
  type: GET_USER,
  user,
});

const getPlaylists = (playlists) => ({
  type: GET_PLAYLISTS,
  playlists,
});

const getPlaylist = (playlist) => ({
  type: GET_PLAYLIST,
  playlist,
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

export const getPlaylistsThunk = () => {
  const accessToken = store.getState().token;
  return async (dispatch) => {
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/playlists',
      {
        headers: { Authorization: 'Bearer ' + accessToken },
      }
    );
    dispatch(getPlaylists(data));
  };
};

export const getPlaylistThunk = (id) => {
  const accessToken = store.getState().token;
  return async (dispatch) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        headers: { Authorization: 'Bearer ' + accessToken },
      }
    );
    dispatch(getPlaylist(data));
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

const playlists = (state = [], action) => {
  switch (action.type) {
    case GET_PLAYLISTS:
      return action.playlists;
    default:
      return state;
  }
};

const playlist = (state = [], action) => {
  switch (action.type) {
    case GET_PLAYLIST:
      return action.playlist;
    default:
      return state;
  }
};

const reducer = combineReducers({
  token,
  user,
  playlists,
  playlist,
});

const store = createStore(reducer, applyMiddleware(thunkMiddlewware));
export default store;
