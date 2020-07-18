import React from 'react';
import UnitPage from './components/Manage/ManageUnit/UnitPage'
import {connect} from 'react-redux'

import {createUnit, editUnit, fetchUnits} from './actions'
import Layout from './components/Drawer/Drawer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AboutPage from './components/About/AboutPage';
import HomePage from './components/Home/HomePage';
import SchedulePage from './components/Schedule/SchedulePage';
import ManagePage from './components/Manage/ManagePage';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUnits())
  }

  onCreateUnit = ({nameVi, notation}) => {
    this.props.dispatch(createUnit({nameVi, notation}))
  }

  onEditUnit = ({id, nameVi, notation}) => {
    this.props.dispatch(editUnit({id, nameVi, notation}))
  }

  render() {
    return (
      <Router>
        <Layout>
          <div>
              <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/about" component={AboutPage}/>
                <Route path="/schedule" component={SchedulePage}/>
                <Route path="/manage" exact component={ManagePage}/>
                <Route 
                  path="/manage-unit" 
                  render={() => <UnitPage 
                    units={this.props.units} 
                    onCreateUnit={this.onCreateUnit}
                    onEditUnit={this.onEditUnit}
                    />} />
              </Switch>
          </div>
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    units: state.units
  }
}

export default connect(mapStateToProps) (App);
