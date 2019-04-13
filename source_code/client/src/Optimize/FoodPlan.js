import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { loadCSS } from 'fg-loadcss/src/loadCSS'
import classNames from 'classnames'
import {
    List,
    ListItem,
    Checkbox,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
    withStyles,
    Icon
} from '@material-ui/core';

const styles = theme => ({
    list: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadows: theme.shadows[5],
        overflow: 'auto',
        maxHeight: 360
       
    },
    selectFrame: {
        boxShadow: '5px 5px 10px 2px gray',
        borderRadius: '5px',
        maxWidth: 400,
        marginBottom: 20,
        
    },
    root: {
        maxWidth: 400,
        marginBottom: 20,
        margin: '0px auto'
    }
})

class FoodPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: [],
        }

        this._handleToogle = this._handleToogle.bind(this)
        this._saveToForward = this._saveToForward.bind(this)
    }

    componentDidMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#insertion-point-jss'),
        )

        const {planFoodId} = this.props
        // console.log(planFoodId)
        this.setState({checked: planFoodId})
    }

    _handleToogle = _id => () => {
        const {checked} = this.state
        const currentIndex = checked.indexOf(_id)
        const newChecked = [...checked]

        if(currentIndex === -1) {
            newChecked.push(_id)
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({checked: newChecked})
    }

    _saveToForward = () => {
        const {step} = this.props
        const {checked} = this.state
        this.props.setPlanFoodId(checked)
        this.props.nextStep(step)
    }

    render() {
        const {classes, step, foods} = this.props

        return(
            <div className={classes.root}>
                <h2 style={{margin: 20}}>Select your favorite food</h2>
                <div className={classes.selectFrame}>
                    <h3 style={{padding: 20}}>Food</h3>
                    <List className={classes.list}>
                        {foods.map((value, key) => (
                            <ListItem key={key} role={undefined} dense button onClick={this._handleToogle(value._id)}>
                                <Checkbox
                                    checked={this.state.checked.indexOf(value._id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={value.name} />
                                <ListItemSecondaryAction>
                                <IconButton aria-label="Comments">
                                    <Icon className={classNames(classes.icon, "fas fa-info")} color="primary" />
                                </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <button onClick={() => this.props.prevStep(step)}>Back</button>
                <button onClick={this._saveToForward}>Next</button>
            </div>
        )
    }
}

FoodPlan.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FoodPlan)