import React, {Component} from 'react'
import { PropTypes } from 'prop-types'
import {withStyles, Modal} from "@material-ui/core"

function getModalStyle() {
    const top = 10
    const left = 25

    return {
        top: `${top}%`,
        left: `${left}%`
    }
}

const styles = theme => ({
    paper: {
        width: '50%',
        outline: 'none',
        padding: theme.spacing.unit * 2,
        boxShadow: theme.shadows[5],
        backgroundColor: theme.palette.background.paper,
        position: 'absolute'
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
        const {classes, data} = this.props;
        return (
            <div>
                <span onClick={this._handleOpen}>{this.props.title}</span>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModal}
                    onClose={this._handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <span>View all details of food</span>
                        <table>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>{data._id}</td>
                                </tr>
                                <tr>
                                    <td>Name English</td>
                                    <td>
                                        {data.name_en}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name Vietname</td>
                                    <td>{data.name_vi}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal>
            </div>
        )
    }
}

ModalDetail.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ModalDetail)