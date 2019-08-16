import React from 'react';
import './app.css';
import Dashboard from '../Dashboard/dashboard';
import RootStore from '../../models/RootStotre';
import DashboardProvider from '../Dashboard/DashboardProvider';
import {Provider} from 'mobx-react'


function App() {
  return (
    <div className="app">
      <Dashboard />
      
    </div>
  );
}

export default App;