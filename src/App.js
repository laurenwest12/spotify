import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAccessTokenThunk,
  getUserThunk,
  getPlaylistsThunk,
  getPlaylistThunk,
} from './redux/store';

import queryString from 'query-string';

class App extends Component {
  async componentDidMount() {
    const { access_token } = queryString.parse(window.location.search);
    this.props.getAccessToken(access_token);
    this.props.getUser();
    this.props.getPlaylists();
    this.props.getPlaylist('5c1VqJ596GXHT2OR8ykz1g');
  }

  render() {
    console.log(this.props.playlist);
    return (
      <div>
        {!this.props.token && (
          <button
            onClick={() => (window.location = 'http://localhost:8888/login')}
          >
            Sign in
          </button>
        )}
        <div>Hello</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    playlists: state.playlists,
    playlist: state.playlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccessToken: (token) => dispatch(getAccessTokenThunk(token)),
    getUser: () => dispatch(getUserThunk()),
    getPlaylists: () => dispatch(getPlaylistsThunk()),
    getPlaylist: (id) => dispatch(getPlaylistThunk(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
