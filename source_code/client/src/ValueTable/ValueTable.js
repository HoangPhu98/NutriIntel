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

class ValueTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valNutri: null,
            formData: {
                name_en: '',
                name_vi: ''
            }
        }

        this._handleDeleteRow = this._handleDeleteRow.bind(this);
        this._addNutrient = this._addNutrient.bind(this);
        this._updateNutrient = this._updateNutrient.bind(this)
    }


    _addNutrient(newNutrient) {
        this.setState({
            valNutri: [...this.state.valNutri, newNutrient]
        })
    }

    _updateNutrient = (dataUpdated) => {
        axios({
            method: 'post',
            responseType: 'json',
            url: `${config.host}:${config.port}/${config.paramTable}/${config.paramUpdateOne}`,
            data: dataUpdated
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

    componentDidMount() {
        axios({
                method: 'get',
                url: config.host + ':' + config.port + '/' + config.paramTable + '/' + config.paramGetAll,
                responseType: 'json'
            })
            .then(res => {
                this.setState({valNutri: res.data})
            });
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
                }
            // {
            //     config: {
            //         adapter: ƒ,
            //         transformRequest: {…},
            //         transformResponse: {…},
            //         timeout: 0,
            //         xsrfCookieName: "XSRF-TOKEN",
            //         …
            //     }
            //     data: {
            //         n: 1,
            //         ok: 1
            //     }
            //     headers: {
            //         content - type: "application/json; charset=utf-8"
            //     }
            //     request: XMLHttpRequest {
            //         onreadystatechange: ƒ,
            //         readyState: 4,
            //         timeout: 0,
            //         withCredentials: false,
            //         upload: XMLHttpRequestUpload,
            //         …
            //     }
            //     status: 200
            //     statusText: "OK"
            //     __proto__: Object
            // }
        })
    }

    


    render() {
        const {valNutri} = this.state;


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
                Header: 'Name_en',
                accessor: 'name_en',
                Filter: (makePlaceholderFilter('Search for English name'))
            }, {
                Header: "Name_vi",
                accessor: 'name_vi',
                Filter: (makePlaceholderFilter('Search for Vietnamese name'))
            },{
                Header: 'Action',
                Cell: row => (
                    <div>
                        <button><ModalDetail title='Detail' data={row.original} /></button>
                        <button><ModalUpdate title='Edit' data={row.original} updateNutrient={this._updateNutrient} /></button>
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
            <div>
                <Button variant="contained" color="default" >Import data</Button>
                <Button variant="contained" color="default" ><ModalAddRecord addNutrient={this._addNutrient} title='Add record' /></Button>
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
            </div>
        )
    }
}


export default ValueTable;
