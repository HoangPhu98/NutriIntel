import React, { Component } from 'react';
import ValueTable from './ValueTable/ValueTable';
import NavBar from './Navigator/Navbar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <ValueTable />
      </div>
    );
  }
}

export default App;
