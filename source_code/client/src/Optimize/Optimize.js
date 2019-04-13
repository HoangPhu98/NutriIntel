import React, {Component} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {config} from '../config'
import {
    withStyles,
} from '@material-ui/core'

import MealPlan from './MealPlan'
import FoodPlan from './FoodPlan'
import Calculate from './Calculate';
const styles = theme => ({

});

class Optimize extends Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            mealPlans: null,
            foods: null,
            planId: null,
            planFoodId: []
        }
        this._nextStep = this._nextStep.bind(this)
        this._prevStep = this._prevStep.bind(this)
        this._getPlanId = this._getPlanId.bind(this)
        this._getPlanFoodId = this._getPlanFoodId.bind(this)
    }

    componentDidMount() {
        axios({
            medthod: 'get',
            url: `${config.host}:${config.port}/${config.paramPlan}/${config.paramGetAll}`,
            responseType: 'json'
        })
        .then(res => {
            this.setState({mealPlans: res.data})
        })

        axios({
            method: 'get',
            url: `${config.host}:${config.port}/${config.paramTable}/${config.paramGetAll}`,
            responseType: 'json'
        })
        .then(res => {
            this.setState({foods: res.data})
        });
    }

    _nextStep = (step) => {
        let nextStep = step + 1;
        this.setState({step: nextStep})
    }

    _prevStep = (step) => {
        let backStep = step - 1;
        this.setState({step: backStep})
    }

    _getPlanId = (_planId) => {
        // console.log(_planId)
        this.setState({planId: _planId})
    }

    _getPlanFoodId = (_planFoodId) => {
        // console.log(_planFoodId)
        this.setState({planFoodId: _planFoodId})
    }

    render() {
        const {step, mealPlans, foods, planFoodId, planId} = this.state

        return (
            step !== undefined &&
            <div>
                { step === 0 &&
                <MealPlan 
                    mealPlans={mealPlans} 
                    step={step} 
                    nextStep={this._nextStep}
                    setPlanId={this._getPlanId}
                />
                }
                { step === 1 &&
                <FoodPlan
                    foods={foods}
                    step={step}
                    planFoodId={planFoodId}
                    prevStep={this._prevStep}
                    nextStep={this._nextStep}
                    setPlanFoodId={this._getPlanFoodId}
                />
                }
                { step === 2 &&
                <div>
                    {console.log(this.state.planFoodId)}
                    {console.log(this.state.planId)}
                    <Calculate
                        step={step}
                        prevStep={this._prevStep}
                        planId={planId}
                        planFoodId={planFoodId}
                    />
                </div>
                }
                
            </div>

        )
    }
}

Optimize.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Optimize)