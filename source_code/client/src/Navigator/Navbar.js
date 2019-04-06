import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Tab, Tabs } from '@material-ui/core'

import ValueTable from '../ValueTable/ValueTable'
import Home from '../Home/Home'
import News from '../News/News'
import Menu from '../Menu/Menu'
import Optimize from '../Optimize/Optimize'

function TabContainer(props) {
	return (
		<Typography component='div' style={{padding: 8 * 3}}>
			{props.children}
		</Typography>
	)
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
}

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	}
})

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
					idView: 0
        }
    }

		_handleChange = (event, idView) => {
			this.setState({idView})
		}

    render() {
			const {classes} = this.props
			const {idView} = this.state
			return (
				<div className={classes.root}>
					<AppBar position='static'>
						<Tabs
							value={idView}
							onChange={this._handleChange}
						>
							<Tab label="Home" />
							<Tab label="News" />
							<Tab label='List Food' />
							<Tab label='List Diet Plan' />
							<Tab label='Optimize' />
						</Tabs>
					</AppBar>
					{idView === 0 && <TabContainer><Home /></TabContainer>}
					{idView === 1 && <TabContainer><News /></TabContainer>}
					{idView === 2 && <TabContainer><ValueTable /></TabContainer>}
					{idView === 3 && <TabContainer><Menu /></TabContainer>}
					{idView === 4 && <TabContainer><Optimize /></TabContainer>}
				</div>
			)
    }
}

NavBar.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)