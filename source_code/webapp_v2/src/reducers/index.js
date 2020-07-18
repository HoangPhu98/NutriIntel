
export default function units(state={units: []}, action) {
    if(action.type === 'CREATE_UNIT') {
        return {units: state.units.concat(action.payload)}
    }

    if(action.type === 'EDIT_UNIT') {
        const {payload} = action
        console.log("Payload: ", payload)
        return {
            units: state.units.map(unit => {
                if(unit.id === payload.id) {
                    return Object.assign({}, unit, payload)
                }

                return unit
            })
        }
    }

    if(action.type === 'FETCH_UNITS_SUCCEEDED') {
        return {
            units: action.payload.units
        }
    }

    return state
}