import React, {Component} from 'react';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({

});


class MainListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
    }

  }

  componentWillMount() {
      loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
      );
  }



  render() {
    const {classes} = this.props;

    return (
      <div>
        <ListItem button onClick={() => this.props.selectItem(1)}>
          <ListItemIcon> 
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => this.props.selectItem(2)}>
          <ListItemIcon>
            <Icon className={clsx(classes.icon, "fas fas fa-cookie")} />
          </ListItemIcon>
        <ListItemText primary="Food" />
        </ListItem>
        <ListItem button onClick={() => this.props.selectItem(3)}>
          <ListItemIcon>
            <Icon className={clsx(classes.icon, "fab fa-elementor")} />
          </ListItemIcon>
          <ListItemText primary="Diet" />
        </ListItem>
        <ListItem button onClick={() => this.props.selectItem(4)}>
          <ListItemIcon>
            <Icon className="fab fa-nutritionix" />
          </ListItemIcon>
          <ListItemText primary="Nutrient" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon className={clsx(classes.icon, "fas fa-chart-bar")} />
          </ListItemIcon>
          <ListItemText primary="Statistic" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon className={clsx(classes.icon, "fas fa-calculator")} />
          </ListItemIcon>
          <ListItemText primary="Calculate" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon className={clsx(classes.icon, "fab fa-resolving")} />
          </ListItemIcon>
          <ListItemText primary="Optimize" />
        </ListItem>
      </div>
    )
  }
}

MainListItem.propTypes = {
  classes: propTypes.object.isRequired
}

export default withStyles(styles)(MainListItem);
