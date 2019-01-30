import React, { Component } from 'react';
import axios from 'axios';

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
        <button
          onClick={() => this._handleClick()}
        >CLick me</button>
      </div>
    );
  }
}

export default App;
