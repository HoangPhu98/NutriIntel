import React, {Component} from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './styles.css'
import {Button} from '@material-ui/core'
import axios from 'axios';
import ModalImportData from './ModalImportData'
import ModalAddRecord from './ModalAddRecord'
import {config} from '../config'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mealPlans : null
        }
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
    }


    render() {

        const makePlaceholderFilter = placeholder => ({filter, onChange}) => (
            <input type='text'
                placeholder={placeholder}
                style={{width: '100%' }}
                value={filter ? filter.value : ''}
                onChange={(event) => onChange(event.target.value)}
            />
        )

        const filterCaseInsensitive = (filter, row) => {
            const id = filter.pivotId || filter.id;
            return (
                row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) :
                true
            );
        }


        const {mealPlans} = this.state;
        
        /**
         * a columns in columns
         {
             Header: 'Energy',
             columns: [{
                 Header: 'Min',
                 accessor: 'ingredients.energyC[0]'
             }, {
                 Header: 'Max',
                 accessor: 'ingredients.energyC[1]'
             }],
             filterable: false
         }
         */

        const columns = [{
            Header: 'ID',
            accessor: '_id',
            show: false
        }, {
            Header: 'Name',
            accessor: 'name',
            Filter: (makePlaceholderFilter('Search for name'))
        },{
            Header: 'Description',
            accessor: 'description',
            filterable: false
        }, 
        {
            Header: 'Energy (calo)',
            accessor: 'ingredient.energyC',
            Cell: row => (
                <div>{row.value[0]} -> {row.value[1]}</div>
            ),
            filterable: false
        }, 
        {
            Header: 'Protein',
            accessor: 'ingredient.protein',
            Cell: row => (
                <div>{row.value[0]} -> {row.value[1]}</div>
            ),
            filterable: false
        }, {
            Header: 'Fat',
            accessor: 'ingredient.fat',
            Cell: row => (
                <div>{row.value[0]} -> {row.value[1]}</div>
            ),
            filterable: false
        }, {
            Header: 'Carbonhydrate',
            accessor: 'ingredient.carbohydrate',
            filterable: false,
            Cell: row => {
                return (<div>{row.value[0]} -> {row.value[1]}</div>)
            }
        },
         {
            Header: 'Action',
            columns: [{
                Header: 'Details',
                Cell: row => (
                    <div><button style={{width: '100%'}}>Details</button></div>
                ),
                width: 60,
                filterable: false
            },{
                Header: 'Edit',
                Cell: row => (
                    <div><button style={{width: '100%'}}>Edit</button></div>
                ), 
                width: 60,
                filterable: false
            }, {
                Header: 'Delete',
                Cell: row => (
                    <div><button style={{width: '100%'}}>Delete</button></div>
                ),
                width: 60,
                filterable: false
            }]
        }]

        

        return (
            mealPlans !== null &&
            <div>
                <Button variant="contained" color="default">
                    <ModalImportData title='ImportData'/>
                </Button>
                <Button variant="contained" color="default">
                    <ModalAddRecord title="Add Record"/>
                </Button>
                <h1 style={{margin: 10}}>Che do an</h1>
                <ReactTable
                    className='-striped -hightlight'
                    data={mealPlans}
                    columns={columns}
                    defaultPageSize={10}
                    filterable={true}
                    defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row)}
                />
                <Button>Download Sample Data</Button>
            </div>
        )
    }
}

export default Menu;