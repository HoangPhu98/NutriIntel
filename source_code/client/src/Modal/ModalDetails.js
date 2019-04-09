import React, {Component} from 'react'
import { PropTypes } from 'prop-types'
import {
    withStyles,
    Modal,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Card,
    CardHeader,
    CardContent,
    Typography
} from "@material-ui/core";


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
        outline: 'none',
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

class ModalDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false
        }

        this._handleOpen = this._handleOpen.bind(this)
        this._handleClose = this._handleClose.bind(this)
    }

    _handleOpen = () => {
        this.setState({
            openModal: true
        })
    }

    _handleClose = () => {
        this.setState({
            openModal: false
        })
    }

    render() {
        const {classes, data, unit} = this.props;

        return (
           data !== null && unit !== null &&
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
                            title={data.name}
                            style={{textAlign: 'center'}}
                        >
                        </CardHeader>
                        <CardContent>
                            <Typography component="div">
                                <div>Group: {data.type}</div>
                                <div>Other Name: {data.generalName}</div>
                                {data.description !== '-' &&
                                    <div>{data.description}</div>
                                }
                                <div style={{fontStyle: 'italic'}}>Nutrient in {data.amount}{unit.fields[3].unit_2}</div>
                            </Typography>
                            < div className={classes.wrapTable} >
                            <Table className={classes.table}>
                                <TableBody
                                >
                                    {unit.fields.map((nutrient, index) => (
                                        index > 4 &&
                                        <TableRow key={index} className={classes.row}>
                                            <CustomTableCell component="th" scope="row">
                                                {nutrient.name} 
                                            </CustomTableCell>
                                            <CustomTableCell align="right">
                                                {data[nutrient.key]} {nutrient.unit_2}
                                            </CustomTableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </div>
                        </CardContent>
                    </Card>
                </Modal>
            </div>
        )
    }
}

ModalDetail.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ModalDetail)