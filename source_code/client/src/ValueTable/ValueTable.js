import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './styles.css';
import {Button} from '@material-ui/core';
import axios from 'axios';
import ModalAddRecord from '../Modal/ModalAddRecord';
import {config} from '../config';
import ModalUpdate from "../Modal/ModalUpdate";
import ModalDetail from "../Modal/ModalDetails";
import ModalImportData from "../Modal/ModalImportData";

class ValueTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valNutri: null,
            formData: {
                name_en: '',
                name_vi: ''
            },
            unitProcess: null  //Array unit
        }

        this._handleDeleteRow = this._handleDeleteRow.bind(this);
        this._addNutrient = this._addNutrient.bind(this);
        this._updateNutrient = this._updateNutrient.bind(this)
        this._importData = this._importData.bind(this)
    }


    _addNutrient = (newNutrient) => {
        this.setState({
            valNutri: [...this.state.valNutri, newNutrient]
        })
    }

    _updateNutrient = (dataUpdated) => {
        axios({
            method: 'POST',
            url: `${config.host}:${config.port}/${config.paramTable}/${config.paramUpdateOne}`,
            data: dataUpdated,
            responseType: 'json'
        })
        .then(res => {
            const {valNutri} = this.state
            valNutri.forEach(element => {
                if(element._id === dataUpdated._id) {
                    element = dataUpdated
                }
            });
            this.setState({valNutri: valNutri})
        })
        .catch(e => e)
    }

    _importData = () => {
        axios({
            method: 'get',
            url: config.host + ':' + config.port + '/' + config.paramTable + '/' + config.paramGetAll,
            responseType: 'json'
        })
        .then(res => {
            this.setState({
                valNutri: res.data
            })
        });
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: config.host + ':' + config.port + '/' + config.paramTable + '/' + config.paramGetAll,
            responseType: 'json'
        })
        .then(res => {
            this.setState({valNutri: res.data})
        });

        axios({
            medthod: 'get',
            url: `${config.host}:${config.port}/${config.paramUnit}`,
            responseType: 'json'
        })
        .then(res => {
            // this.setState({unitProcess: res.data[0].fields})
            this.setState({unitProcess: res.data[0]})
        })
    } 

    _handleDeleteRow = (value) => {
        const isNotId = item => item._id !== value._id
        const updatedList = this.state.valNutri.filter(isNotId)
        axios({
            method: 'post',
            url: config.host + ':' + config.port + '/' + config.paramTable + '/' + config.paramDeleteOne,
            data: value,
            responseType: 'json'
            })
        .then(res => {
            if(res.data.n === 1){
                alert("Xoa thanh cong");
                this.setState({
                    valNutri: updatedList
                })
            }else{
                alert("Xoa that bai");        
            }
        })
        .catch(err => {
            console.log(err)
        })
    }



    render() {
        const {valNutri, unitProcess} = this.state;

        const makePlaceholderFilter = placeholder => ({filter, onChange}) => (
            <input type='text'
                placeholder={placeholder}
                style={{
                width: '100%'
                }}
                value={filter ? filter.value : ''}
                onChange={(event) => onChange(event.target.value)}
            />
        )

        const columns = [{
                Header: 'ID',
                accessor: '_id',
                show: false
            },{
                Header: 'Name',
                accessor: 'name',
                Filter: (makePlaceholderFilter('Search for name'))
            }, {
                Header: 'Amount',
                accessor: 'amount',
                filterable: false
            },{
                Header: "Energy",
                accessor: 'energyC',
                filterable: false
            }, {
                Header: "Protein",
                accessor: 'protein',
                filterable: false
            }, {
                Header: 'Carbohydrate',
                accessor: 'carbohydrate',
                filterable: false
            }, {
                Header: 'Total Sugar',
                accessor: 'totalSugar',
                filterable: false
            }, {
                Header: 'Fat',
                accessor: 'fat',
                filterable: false
            }, {
                Header: 'Calcium',
                accessor: 'calcium',
                filterable: false
            }, {
                Header: 'Action',
                Cell: row => (
                    <div>
                        <button><ModalDetail title='Detail' data={row.original} unit={unitProcess}/></button>
                        <button><ModalUpdate title='Edit' data={row.original} unit={unitProcess} updateNutrient={this._updateNutrient} /></button>
                        <button onClick={() => this._handleDeleteRow(row.original)}>Delete</button>
                    </div>
                ),
                filterable: false
            }]

        
        const filterCaseInsensitive = (filter, row) => {
            const id = filter.pivotId || filter.id;
            return (
                row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) :
                true
            );
        }


        return (
            valNutri !== null && unitProcess !== null &&
            <div>
                <Button variant="contained" color="default" ><ModalImportData importData={this._importData} title='Import data' /></Button>
                <Button variant="contained" color="default" ><ModalAddRecord unit={unitProcess} addNutrient={this._addNutrient} title='Add record' /></Button>
                { valNutri &&
                <ReactTable
                    className = '-striped -highlight'
                    data={this.state.valNutri}
                    columns={columns}
                    defaultPageSize={10}
                    filterable={true}
                    defaultFilterMethod={
                        (filter, row) => filterCaseInsensitive(filter, row)
                    }
                    />
                }
                <Button>Download Sample Import</Button>
            </div>
        )
    }
}


export default ValueTable;
