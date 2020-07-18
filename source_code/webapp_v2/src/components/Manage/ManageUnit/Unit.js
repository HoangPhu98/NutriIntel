import React from 'react'

class Unit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditForm: false,
            id: 0,
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

    resetForm() {
        this.setState({
            showEditForm: false,
            nameVi: '',
            notation: '',
        })
    }

    onEditUnit = (e) => {
        e.preventDefault()
        this.props.onEditUnit({
            id: this.state.id,
            nameVi: this.state.nameVi,
            notation: this.state.notation,
        })
        this.resetForm()
    }

    toggleEditForm = e => {
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    UNSAFE_componentWillMount() {
        this.setState({id: this.props.unit.id})
    }

    render() {
        const {unit} = this.props

        return (
            <div className="unit">
                <div className="unit-header">
                    <div>{unit.nameVi}</div>
                </div>
                <hr />
                <div className="unit-body">
                    {unit.notation}
                </div>
                <button 
                    className="button edit-button"
                    onClick={this.toggleEditForm}
                >
                    Edit
                </button>
                {this.state.showEditForm && (
                    <div>
                        <form className="edit-unit-form" onSubmit={this.onEditUnit}>
                            <input
                                className="full-width-input"
                                onChange={this.onNameViChange}
                                value={this.state.nameVi}
                                type="text"
                                placeholder="name"
                            />
                            <input
                                className="full-width-input"
                                onChange={this.onNotationChange}
                                value={this.state.notation}
                                type="text"
                                placeholder="notation"
                            />
                            <button
                                className="button"
                                type="submit"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                )}   
            </div>
        )
    }
}

export default Unit