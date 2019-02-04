import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './styles.css';
import {Button} from '@material-ui/core';
import axios from 'axios';
import ModalRecord from '../Modal/Modal';
import {config} from '../config';

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

        this._handleEditRow = this._handleEditRow.bind(this);
        this._handleDeleteRow = this._handleDeleteRow.bind(this);
        this._addNutrient = this._addNutrient.bind(this);
    }


    _addNutrient(newNutrient) {
        this.setState({
            valNutri: [...this.state.valNutri, newNutrient]
        })
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

    _handleEditRow = (value) => {
        console.log(value)
    }

    _handleDeleteRow = (value) => {
        const isNotId = item => item._id !== value._id;
        const updatedList = this.state.valNutri.filter(isNotId);
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
        const columns = [{
                Header: 'ID',
                accessor: '_id',
                show: false
            },{
                Header: 'Name_en',
                accessor: 'name_en'
            }, {
                Header: "Name_vi",
                accessor: 'name_vi',
            },{
                Header: 'Action',
                Cell: row => (
                    <div>
                        <button onClick={() => this._handleEditRow(row.original)}>Edit</button>
                        <button onClick={() => this._handleDeleteRow(row.original)}>Delete</button>
                    </div>
                )
            }]

        const {valNutri} = this.state;
        return (
            <div>
                <Button variant="contained" color="default" >Import data</Button>
                <Button variant="contained" color="default" >Export data</Button>
                <Button variant="contained" color="default" ><ModalRecord addNutrient={this._addNutrient} title='Add record' /></Button>
                { valNutri &&
                <ReactTable
                    className = '-striped -highlight'
                    data={this.state.valNutri}
                    columns={columns}
                    defaultPageSize = {10}
                    />
                }
            </div>
        )
    }
}


export default ValueTable;
