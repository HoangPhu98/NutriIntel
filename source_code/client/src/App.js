import React, { Component } from 'react';
import axios from 'axios';
import ValueTable from './ValueTable/ValueTable';
import NavBar from './Navigator/Navbar';
import './App.css';
import SimpleModal from './Modal';

class App extends Component {

  _handleClick = () => {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:3001/nutrientValue/all/',
        responseType: 'json'
      })
      .then(function (res) {
        console.log(res.data);
      });
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <ValueTable />
        <button
          onClick={() => this._handleClick()}
        >CLick me</button>
        <SimpleModal />
      </div>
    );
  }
}

export default App;
