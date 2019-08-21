import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Button, IconButton} from '@material-ui/core';
import FoodService from "../../services/foodService/foodService";
import {withStyles} from '@material-ui/core/styles'
import propTypes from 'prop-types'
import EditRounded from '@material-ui/icons/EditRounded'
import ModalDetail from './Modal/ModelDetail'
import DeleteRounded from '@material-ui/icons/DeleteRounded'
import AddBox from '@material-ui/icons/AddBox'
import {Grid} from '@material-ui/core'
import ModalImport from "./Modal/ModalImport";

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
        minWith: 180,
        height: 34,
    },
    buttonAction: {
        marginTop: -4, 
        marginBottom: -4, 
        marginLeft: 3, 
        marginRight: 3
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
})

class FoodTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: null,
            formData: {
                name_en: '',
                name_vi: ''
            },
            unitProcess: null  //Array unit
        }

        this.foodService = new FoodService();
        this.ImportFoods = this.ImportFoods.bind(this)
    }

    componentDidMount() {
        this.GetFoods()
    }

    render() {
        const {foods} = this.state;
        const {classes} = this.props;

        const makePlaceholderFilter = placeholder => ({filter, onChange}) => (
            <input type='text'
				placeholder={placeholder}
                style={{width: '100%'}}
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
                className: "rt-right",
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                Filter: (makePlaceholderFilter('Search for name'))
            }, {
                Header: 'Amount',
                accessor: 'amount',
                filterable: false,
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                width: 100
            },{
                Header: "Energy",
                accessor: 'energyC',
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                filterable: false,
                width: 100
            }, {
                Header: "Protein",
                accessor: 'protein',
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                filterable: false,
                width: 100
            }, {
                Header: 'Carbohydrate',
                accessor: 'carbohydrate',
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                filterable: false,
                width: 100
            }, {
                Header: 'Total Sugar',
                accessor: 'totalSugar',
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                filterable: false,
                width: 100
            }, {
                Header: 'Fat',
                accessor: 'fat',
                filterable: false,
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                width: 100
            }, {
                Header: 'Calcium',
                accessor: 'calcium',
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                filterable: false,
                width: 100
            }, {
                Header: 'Action',
                Cell: row => (
                    <div style={{ textAlign: "center" }}>
                        <IconButton className={classes.buttonAction} color="primary" size="small"><ModalDetail data={row.original}/></IconButton>
                        <IconButton className={classes.buttonAction} color="primary" size="small"><EditRounded /></IconButton>
                        <IconButton className={classes.buttonAction} color="primary" size="small"><DeleteRounded /></IconButton>
                    </div>
                ),
                filterable: false,
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
            foods !== null &&
            <div>
                <Grid 
                    container
                    justify="center"
                >
                    <Grid item xs={8}><div style={{verticalAlign:'middle'}}>Gia tri dinh duong cho 100g</div></Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="default" className={classes.button}>
                            <ModalImport importFoods={this.ImportFoods} />
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="default" className={classes.button}>
                            Add Food
                            <AddBox className={classes.rightIcon} />
                        </Button>
                    </Grid>
                </Grid>
                <ReactTable
					data={foods}
                    className = '-striped -highlight'
                    columns={columns}
                    defaultPageSize={10}
                    filterable={true}
                    defaultFilterMethod={
                        (filter, row) => filterCaseInsensitive(filter, row)
                    }
                    />
                <Button>Download Sample Import</Button>
            </div>
        )
    }

    GetFoods() {
        this.foodService.retrieveFoods().then(foods => {
            this.setState({foods: foods})
        });
    }

    ImportFoods(data) {
        this.foodService.importFoods(data).then(foods => {
            this.setState({foods: foods})
        })
    }
}


FoodTable.propTypes = {
    classes: propTypes.object.isRequired
}

export default withStyles(styles)(FoodTable);
