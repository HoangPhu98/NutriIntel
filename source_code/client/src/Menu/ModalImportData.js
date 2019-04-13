import React, {Component} from 'react'
import { PropTypes } from 'prop-types'
import {withStyles, Modal, Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';
import {config} from '../config'

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
    }
})

class ModalImport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            selectFile: null
        }

        this._handleClose = this._handleClose.bind(this)
        this._handlOpen = this._handlOpen.bind(this)
        this._handleSelectUpload = this._handleSelectUpload.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
    }

    _handlOpen = () => {
        this.setState({openModal: true})
    }

    _handleClose = () => {
        this.setState({openModal: false})
    }

    _handleSelectUpload = event => {
        console.log(event.target.files[0])
        this.setState({
            selectFile: event.target.files[0]
        })
    }

    _handleSubmit = () => {
        const data = new FormData()
        data.append('fileName', this.state.selectFile, this.state.selectFile.name)
        console.log(data)
        axios({
            method: 'POST',
            url: `${config.host}:${config.port}/${config.paramPlan}/${config.paramImport}`,
            responseType: 'json',
            data: data,
        })
        .then(res => {
            console.log(">>>>>")
            console.log(res)
        })

        this._handleClose()
    }

    render() {
        const {classes, title} = this.props

        return (
            <div>
                <span onClick={this._handlOpen}>
                    Import Data
                </span>
                <Modal
                    open={this.state.openModal}
                    onClose={this._handleClose}
                >
                    <Card style={getModalStyle()} className={classes.plat}>
                        <CardHeader
                            title={title}
                            style={{textAlign: 'center'}}
                        >
                        </CardHeader>
                        <CardContent>
                            <Typography component='div'>
                                <div>Choose the file from your usage:</div>
                                <div>
                                    <input 
                                        type='file' 
                                        name='fileName' 
                                        onChange={this._handleSelectUpload} />
                                    <input 
                                        style={{padding: '5px'}} 
                                        type='submit' value='submit'
                                        onClick={this._handleSubmit} />
                                    </div>
                            </Typography>
                        </CardContent>
                    </Card>
                </Modal>
            </div>
        )
    }

}

ModalImport.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ModalImport)