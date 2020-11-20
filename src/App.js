import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAccessTokenThunk, getUserThunk } from './redux/store';

import queryString from 'query-string';

class App extends Component {
  async componentDidMount() {
    const { access_token } = queryString.parse(window.location.search);
    await this.props.getAccessToken(access_token);
    await this.props.getUser();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <button
          onClick={() => (window.location = 'http://localhost:8888/login')}
        >
          Sign in
        </button>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccessToken: (token) => dispatch(getAccessTokenThunk(token)),
    getUser: () => dispatch(getUserThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
