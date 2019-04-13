import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal, withStyles, Card, CardHeader, CardContent } from '@material-ui/core';


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
        outline: 'none',
        padding: theme.spacing.unit * 2,
        boxShadow: theme.shadows[5],
        backgroundColor: theme.palette.background.paper,
        position: 'absolute'
    }
})

class ModalAddRecord extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            formData: null
        }

        this._handleOpen = this._handleOpen.bind(this)
        this._handleClose = this._handleClose.bind(this)
    }
    
    _handleOpen = () => {
        this.setState({open: true})
    }
    
    _handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const {classes, title} = this.props

        return (
        <div>
            <span onClick={this._handleOpen}>{this.props.title}</span>
            <Modal 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this._handleClose}
            >
                <Card style={getModalStyle()} className={classes.plat}>
                    <CardHeader title={title} style={{textAlign: 'center'}}></CardHeader>
                    <CardContent>
                        <span>Not yet</span>
                    </CardContent>
                </Card>
            </Modal>
        </div>
        )
    }
}

ModalAddRecord.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ModalAddRecord)