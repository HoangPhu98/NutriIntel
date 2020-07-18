import * as api from '../api'

let _id = 1;
export function uniqueId() {
    return _id++;
}

export function createUnit({nameVi, notation}) {
    console.log("Create action: ", nameVi, " - ", notation)
    return {
        type: 'CREATE_UNIT',
        payload: {
            id: uniqueId(),
            nameVi,
            notation,
        }
    }
}

export function editUnit({id, nameVi, notation}) {
    return {
        type: 'EDIT_UNIT',
        payload: {
            id,
            nameVi,
            notation,
        }
    }
}

// server action
export function fetchUnitsSucceeded(units) {
    return {
        type: 'FETCH_UNITS_SUCCEEDED',
        payload: {
            units
        }
    }
}

export function fetchUnits() {
    console.log("Fetch in view")
    return dispatch => {
        api.fetchUnits().then(res => {
                dispatch(fetchUnitsSucceeded(res.data.data))
            })
    }
}