import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	withStyles,
	Modal,
    Card,
    CardHeader,
    CardContent,
    Table,
    TableRow,
    TableBody,
    TableCell,
    CardActions,
} from '@material-ui/core';
import axios from 'axios';
import {config} from '../config';

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);


function getModalStyle() {
	const top = 7;
	const left = 30;

	return {
		top: `${top}%`,
		left: `${left}%`
	};
}
  
const styles = theme => ({
  plat: {
  		width: '40%',
  		ountline: 'none',
  		padding: theme.spacing.unit * 2,
  		boxShadow: theme.shadows[5],
  		backgroundColor: theme.palette.background.paper,
  		position: 'absolute'
  	},
  	wrapTable: {
  		overflow: 'auto',
  		height: '390px'
  	},
  	table: {
  		tableLayout: 'fixed'
  	},
  	row: {
  		'&:nth-of-type(odd)': {
  			backgroundColor: theme.palette.background.default,
  		},
  	}
});

class ModalAddRecord extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			formData: null
		}

		this._handleChange = this._handleChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleOpen = this._handleOpen.bind(this);
		this._handleClose = this._handleClose.bind(this);
	}

	componentWillMount() {
		const {unit} = this.props
		
		var formDataV = {}

		unit.fields.map((element, index) =>	{
			if(element.unit_1 === "") {
				formDataV[element.key] = "";
			} else {
				formDataV[element.key] = 0;
			}
		})
		if(this.state.formData === null){
			setTimeout(() => {
				this.setState({formData: formDataV})
				console.log(this.state.formData)
			}, 300);
		}
	}

	_handleChange = (event) => {
		const target = event.target;
		let data = this.state.formData;

		data[target.name] = target.value;

		this.setState({
			formData: data
		})

		//Xu ly tuong thic giau don vi Kj va calo
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
		const {unit, classes} = this.props
		const {formData} = this.state

		return (
		<div>
			<span onClick={this._handleOpen}>{this.props.title}</span>
			{ unit !== null && formData !== null &&
			<Modal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={this.state.open}
			onClose={this._handleClose}
			>
				<Card style={getModalStyle()} className={classes.plat}>
					<CardHeader
						title="Add Food"
						style={{textAlign: 'center'}}
					>
					</CardHeader>
					<CardContent>
						< div className={classes.wrapTable} >
						<Table className={classes.table}>
							<TableBody
							>
								{unit.fields.map((nutrient, index) => (
									<TableRow key={index} className={classes.row}>
										<CustomTableCell component="th" scope="row">
											{nutrient.name} 
										</CustomTableCell>
										<CustomTableCell align="right">
										{ index < 4 && 
											<input 
												type='text'
												name={nutrient.key} 
												value={formData[nutrient.key]} 
												onChange={this._handleChange}
											/>
										}
										{ index > 3 &&
											<input
												type='number'
												name={nutrient.key} 
												value={formData[nutrient.key]} 
												onChange={this._handleChange}
											/>
										}
										</CustomTableCell>
										<CustomTableCell align="left" style={{width: '30px'}}>
											{nutrient.unit_1 !== '' && nutrient.unit_1}
										</CustomTableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						</div>
					</CardContent>
					<CardActions>
						<input type='submit' value='Create New' onClick={this._handleSubmit} />
					</CardActions>
				</Card>
			</Modal>
			}
		</div>
		);
	}
}

ModalAddRecord.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalAddRecord);
