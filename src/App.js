import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAccessTokenThunk,
  getUserThunk,
  getPlaylistsThunk,
} from './redux/store';

import queryString from 'query-string';

class App extends Component {
  async componentDidMount() {
    const { access_token } = queryString.parse(window.location.search);
    this.props.getAccessToken(access_token);
    this.props.getUser();
    this.props.getPlaylists();
  }

  render() {
    console.log(this.props.playlists);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccessToken: (token) => dispatch(getAccessTokenThunk(token)),
    getUser: () => dispatch(getUserThunk()),
    getPlaylists: () => dispatch(getPlaylistsThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
