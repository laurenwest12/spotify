import { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      access_token: '',
      serverData: {},
    };
  }

  async componentDidMount() {
    const { access_token } = queryString.parse(window.location.search);
    this.setState({ access_token });

    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + access_token },
    });

    this.setState({ serverData: data });
  }

  render() {
    console.log(this.state.serverData);
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

export default App;
