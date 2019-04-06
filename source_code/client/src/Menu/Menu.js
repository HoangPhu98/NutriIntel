import React, {Component} from 'react'
import ReactTable, {ReactTableDefaults} from 'react-table'
import 'react-table/react-table.css'
import './styles.css'

import {Button} from '@material-ui/core'
import axios from 'axios'


class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mealPlans : [{
                _id: '123',
                name: "An Kieng",
                description: "Che do cho nhung nguoi giam can",
                ingredients: {
                    energyC: [100, 200],
                    protein: [200, 200],
                    fat: [100, 250],
                    carbohydrate: [50, 100],
                }
            }]
        }
    }


    render() {

        const columns = [{
            Header: 'ID',
            accessor: '_id',
            show: true
        }, {
            Header: 'Name',
            accessor: 'name',

        },{
            Header: 'Description',
            accessor: 'description'
        }, {
            Header: 'Energy',
            accessor: 'ingredients.energyC[0]'
        }, {
            Header: 'Protein',
            accessor: 'ingredients.protein[0]'
        }, {
            Header: 'Fat',
            accessor: 'ingredients.fat[0]'
        }, {
            Header: 'Carbonhydrate',
            accessor: 'ingredients.carbohydrate[0]'
        }]

        const {mealPlans} = this.state

        return (
            <div>
                <h1 style={{margin: 10}}>Che do an</h1>
                <ReactTable
                    className='-striped -hightlight'
                    data={mealPlans}
                    columns={columns}
                    defaultPageSize={10}
                />
            </div>
        )
    }
}

export default Menu;