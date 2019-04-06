import React, { Component } from 'react';
import NavBar from './Navigator/Navbar';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default App;
