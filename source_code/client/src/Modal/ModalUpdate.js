import React, {Component} from 'react'
import { PropTypes } from 'prop-types'
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
} from '@material-ui/core'

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
    const top = 7
    const left = 30

    return {
        top: `${top}%`,
        left: `${left}%`
    }
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
})

class ModalUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            updatedData: props.data
        }

        this._handleOpen = this._handleOpen.bind(this)
        this._handleClose = this._handleClose.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleOnChange = this._handleOnChange.bind(this)
    }

    _handleOnChange = (evt) => {
        const target = evt.target;
        let dataV = this.state.updatedData;

        dataV[target.name] = target.value;

        this.setState({
            updatedData: dataV
        })

        //Xu ly tuong thic giau don vi Kj va calo
    }

    _handleOpen = () => {
        this.setState({openModal: true})
    }

    _handleClose = () => {
        this.setState({openModal: false})
    }

    _handleSubmit = (evt) => {
        this.props.updateNutrient(this.state.updatedData);
        evt.preventDefault();
        alert("Updated Successful!")
        this.setState({openModal: false})
    }

    render() {
        const {classes, unit} = this.props
        const {updatedData} = this.state
        return (
            unit !== null &&
            <div>
                <span onClick={this._handleOpen}>{this.props.title}</span>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModal}
                    onClose={this._handleClose}
                >
                    <Card style={getModalStyle()} className={classes.plat}>
                        <CardHeader
                            title="Update Food"
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
                                                    value={updatedData[nutrient.key]} 
                                                    onChange={this._handleOnChange}
                                                />
                                            }
                                            { index > 3 &&
                                                <input
                                                    type='number'
                                                    name={nutrient.key} 
                                                    value={updatedData[nutrient.key]} 
                                                    onChange={this._handleOnChange}
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
                            <input type='submit' value='Confirm Change' onClick={this._handleSubmit} />
                        </CardActions>
                    </Card>
                </Modal>
            </div>
        )
    }
}

ModalUpdate.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ModalUpdate)