import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './styles.css';
import {Button} from '@material-ui/core';
import axios from 'axios';


class ValueTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name_en: '',
                name_vi: ''
            }
        }

        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleChange = (event) => {
        const target = event.target;
        let data = this.state.formData;
        if(target.name === 'name_en') {
            data.name_en = target.value;
        } else if(target.name === 'name_vi') {
            data.name_vi = target.value;
        }
        this.setState({formData: data});
    }

    _handleSubmit = (event) => {
        axios.post('http://127.0.0.1:3001/nutrientValue', this.state.formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log('ok');
        event.preventDefault();
    }

    componentWillMount(){
        axios({
            method: 'get',
            url: 'http://127.0.0.1:3001/nutrientValue/all/',
            responseType: 'json'
        })
        .then(res => {
            this.setState({valNutri: res.data})
        });
    }

    render() {
        const columns = [{
                Header: 'ID',
                accessor: '_id'
            },{
                Header: 'Name_en',
                accessor: 'name_en'
            }, {
                Header: "Name_vi",
                accessor: 'name_vi',
            }]

        return (
            <div>
                <Button variant="contained" color="default" >Import data</Button>
                <Button variant="contained" color="default" >Export data</Button>
                <Button variant="contained" color="default" >Add record</Button>
                <ReactTable
                    className = '-striped -highlight'
                    data={this.state.valNutri}
                    columns={columns}
                    defaultPageSize = {10}
                    />
                <form>
                    <label>
                        Name English:
                        <input 
                            type='text' 
                            name='name_en'
                            value={this.state.formData.name_en}
                            onChange={this._handleChange} 
                        />
                    </label>
                    <label>
                        Name Vietnam:
                        <input 
                            type='text' 
                            name='name_vi'
                            value={this.state.formData.name_vi}
                            onChange={this._handleChange} />
                    </label>
                    <input 
                        type='submit' 
                        value='submit'
                        onClick={this._handleSubmit} />
                </form>
            </div>
        )
    }
}


export default ValueTable;
