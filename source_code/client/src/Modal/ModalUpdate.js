import React, {Component} from 'react'
import { PropTypes } from 'prop-types'
import {withStyles, Modal} from '@material-ui/core'
import axios from 'axios'
import {config} from '../config'

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

class ModalUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            data: props.data
        }

        this._handleOpen = this._handleOpen.bind(this)
        this._handleClose = this._handleClose.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleOnChange = this._handleOnChange.bind(this)
    }

    _handleOnChange = (evt) => {
        const target = evt.target;
        let dataV = this.state.data;
   
        if(target.name === 'name_en') {
            dataV.name_en = target.value
        }
        if(target.name === 'name_vi') {
            dataV.name_vi = target.value
        }

        this.setState({
            data: dataV
        })
    }

    _handleOpen = () => {
        this.setState({openModal: true})
    }

    _handleClose = () => {
        this.setState({openModal: false})
    }

    _handleSubmit = (evt) => {
        this.props.updateNutrient(this.state.data);
        evt.preventDefault();
        this.setState({openModal: false})
    }

    render() {
        const {classes} = this.props;
        const {data} = this.state;
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
                        <span>Update a row in here</span>
                        <table>
                            <tbody>
                                <tr>
                                    <td>_id</td>
                                    <td><input disabled name='_id' type='text' value={data._id} /></td>
                                </tr>
                                <tr>
                                    <td>Name English</td>
                                    <td><input name='name_en' value={data.name_en} type='text' onChange={this._handleOnChange} /></td>
                                </tr>
                                <tr>
                                    <td>Name Vietnam</td>
                                    <td><input name='name_vi' value={data.name_vi} type='text' onChange={this._handleOnChange} /></td>
                                </tr>
                                <tr>
                                    <td><input type='submit' value='Change' onClick={this._handleSubmit} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal>
            </div>
        )
    }


}

ModalUpdate.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ModalUpdate)