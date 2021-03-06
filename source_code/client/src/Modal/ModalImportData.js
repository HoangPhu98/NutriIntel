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

class ModalImport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            selectFile: null
        }

        this._handelClose = this._handelClose.bind(this)
        this._handelOpen = this._handelOpen.bind(this)
        this._handleSelectUpload = this._handleSelectUpload.bind(this)
        this._handelSubmit = this._handelSubmit.bind(this)
    }

    _handleSelectUpload = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    _handelOpen = () => {
        this.setState({openModal: true})
    }

    _handelClose = () => {
        this.setState({openModal: false})
    }

    _handelSubmit = () => {
        const data = new FormData()
        data.append('fileName', this.state.selectedFile, this.state.selectedFile.name)
        axios
        .post(`${config.host}:${config.port}/${config.paramTable}/${config.paramImport}`, data)
        .then(res => {
            this.props.importData()
        })
        .catch(error => {
            console.log(error);
        });

        this._handelClose()
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <span onClick={this._handelOpen}>
                    Import data
                </span>
                <Modal
                    open={this.state.openModal}
                    onClose={this._handelClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <span>Chose file from your storage:</span>
                        <input type='file' name='fileName' onChange={this._handleSelectUpload}/>
                        <input 
                            type='submit' 
                            value='submit'
                            onClick={this._handelSubmit} />
                    </div>
                </Modal>
            </div>
        )
    }
}

ModalImport.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ModalImport)