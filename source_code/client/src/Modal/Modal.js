import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import axios from 'axios';
import {config} from '../config';

function getModalStyle() {
	const top = 10;
	const left = 40;

	return {
		top: `${top}%`,
		left: `${left}%`
	};
}
  

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
  },
});

class ModalRecord extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			formData: {
				name_en: '',
				name_vi: ''
			}
		}

		this._handleChange = this._handleChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleOpen = this._handleOpen.bind(this);
		this._handleClose = this._handleClose.bind(this);
	}

	_handleChange = (event) => {
		const target = event.target;
		let data = this.state.formData;

		if (target.name === 'name_en') {
			data.name_en = target.value;
		} 
		if (target.name === 'name_vi') {
			data.name_vi = target.value;
		}
		this.setState({
			formData: data
		});
	}

	_handleSubmit = (event) => {
		const {formData} = this.state;
		axios({
			method: 'post',
			url: config.host + ':' + config.port + '/' + config.paramTable, 
			data: formData
		})
		.then(res => {
			this.props.addNutrient(res.data);
		})
		.catch(e => e);
		event.preventDefault();
		this.setState({open: false});
	}

	_handleOpen = () => {
		this.setState({ open: true });
	};

	_handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
		<div>
			<span onClick={this._handleOpen}>{this.props.title}</span>
			<Modal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={this.state.open}
			onClose={this._handleClose}
			>
			<div style={getModalStyle()} className={classes.paper}>
				<table>
				<tbody>
				<tr>
					<td>Name English</td>
					<td><input 
						type='text' 
						name='name_en'
						value={this.state.formData.name_en}
						onChange={this._handleChange} />
					</td>
				</tr>
				<tr>
					<td>Name Vietnam</td>
					<td><input 
						type='text' 
						name='name_vi'
						value={this.state.formData.name_vi}
						onChange={this._handleChange} />
					</td>
				</tr>
				<tr>
					<td><input 
						type='submit' 
						value='submit'
						onClick={this._handleSubmit} />
					</td>
				</tr>
				</tbody>
				</table>
			</div>
			</Modal>
		</div>
		);
	}
}

ModalRecord.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(ModalRecord);
