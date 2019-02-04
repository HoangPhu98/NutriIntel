import React, { Component } from 'react';
import axios from 'axios';
import ValueTable from './ValueTable/ValueTable';
import NavBar from './Navigator/Navbar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleSelectUpload = this._handleSelectUpload.bind(this);

  }

  _handleSelectUpload = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  _handleSubmit = () => {
    const data = new FormData()
    data.append('fileName', this.state.selectedFile, this.state.selectedFile.name)
     axios
      .post('http://127.0.0.1:3001/nutrientValue/importData', data)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <ValueTable />

       
        <input type='file' name='fileName' onChange={this._handleSelectUpload}/>
        <input 
          type='submit' 
          value='submit'
          onClick={this._handleSubmit} />
      </div>
    );
  }
}

export default App;
