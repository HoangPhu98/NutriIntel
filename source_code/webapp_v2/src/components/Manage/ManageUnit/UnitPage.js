import React, {Component, forwardRef} from 'react'
import UnitList from './UnitList'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class UnitPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: -1,
            nameVi: '',
            notation: '',
        }
    }
    
    onNameViChange = (e) => {
        this.setState({nameVi: e.target.value})
    }

    onNotationChange = (e) => {
        this.setState({notation: e.target.value})
    }

    onCreateUnit = () => {
        this.props.onCreateUnit({
            nameVi: this.state.nameVi,
            notation: this.state.notation,
        })
    }

    onEditUnit = () => {
        this.props.onEditUnit({
            id: this.state.id,
            nameVi: this.state.nameVi,
            notation: this.state.notation,
        })
    }

    toggleForm = () => {
        this.setState({showNewCardForm: !this.state.showNewCardForm})
    }

    renderUnitList() {
        const {units} = this.props
        return <UnitList 
            onEditUnit={this.props.onEditUnit}
            units={units} 
        />
    }

    render() {

        const {units} = this.props
        const columns = [
            {title: 'Name', field: 'nameVi'},
            {title: 'Notation', field: 'notation'}
        ]

        if(units !== undefined) {
            units.map((item, index) => {
                if(item.tableData !== undefined) 
                item.tableData.editing = undefined
            })
        }

        return (
            <div>
                {units !== null && 
                <MaterialTable
                icons={tableIcons}
                    title="Unit Manager"
                    columns={columns}
                    data={units}
                    editable={{
                        onRowAdd: newData => 
                            new Promise(resolve => {
                                setTimeout(() =>  {
                                    resolve();
                                    this.setState({
                                        notation: newData.notation,
                                        nameVi: newData.nameVi,
                                    })
                                    this.onCreateUnit()
                                }, 600)
                            }),
                        onRowUpdate:  (newData, oldData) => 
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve()
                                    this.setState({
                                        id: newData.id,
                                        notation: newData.notation,
                                        nameVi: newData.nameVi,
                                    })
                                    this.onEditUnit()

                                }, 600)
                            }),
                        onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                                console.log("Delete: ")
                            }, 600);
                        }),
                    }}
                />
            }
            </div>
        )
    }
}

export default UnitPage