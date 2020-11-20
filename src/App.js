import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAccessTokenThunk,
  getUserThunk,
  getPlaylistsThunk,
  getPlaylistThunk,
} from './redux/store';

import queryString from 'query-string';

const timeFunc = (playlist) => {
  console.log('here');
  const obj = {
    Doug: {
      totalTime: 0,
      artists: {},
    },
    Lauren: {
      totalTime: 0,
      artists: {},
    },
    Travis: {
      totalTime: 0,
      artists: {},
    },
  };

  playlist.items.forEach((item) => {
    const user = item.added_by.id;
    const artist = item.track.artists[0].name;
    const duration = (item.track.duration_ms * 0.001) / 60;

    if (user === '1240690038') {
      if (!obj.Doug.artists[artist]) {
        obj.Doug.artists[artist] = duration;
      } else {
        obj.Doug.artists[artist] += duration;
      }
      obj.Doug.totalTime += duration;
    } else if (user === 'kqop08n80omg6r27s5l300sia') {
      if (!obj.Travis.artists[artist]) {
        obj.Travis.artists[artist] = duration;
      } else {
        obj.Travis.artists[artist] += duration;
      }
      obj.Travis.totalTime += duration;
    } else if (user === '1220884360') {
      if (!obj.Lauren.artists[artist]) {
        obj.Lauren.artists[artist] = duration;
      } else {
        obj.Lauren.artists[artist] += duration;
      }
      obj.Lauren.totalTime += duration;
    }
  });

  return obj;
};

class App extends Component {
  async componentDidMount() {
    const { access_token } = queryString.parse(window.location.search);
    this.props.getAccessToken(access_token);
    this.props.getUser();
    this.props.getPlaylists();
    this.props.getPlaylist('7HwH196Vouhg0kEWxeFbMu');
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
