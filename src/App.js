import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
    };
  }

  // componentDidMount() {

  // }

  render() {
    return (
      <div className="App">
        <button
          onClick={() => (window.location = 'http://localhost:8888/login')}
        >
          Sign in
        </button>
      </div>
    );
  }
}

export default App;
