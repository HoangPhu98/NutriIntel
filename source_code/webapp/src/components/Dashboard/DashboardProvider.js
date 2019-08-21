import React, {Component} from 'react'
import {inject} from 'mobx-react'
import DashboardController from '../../controllers/DashboardController';

class DashboardProvider extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <DashboardController />
        )
    }
}

export default DashboardProvider