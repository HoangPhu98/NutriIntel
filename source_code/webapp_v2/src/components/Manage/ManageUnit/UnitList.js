import React from 'react'
import Unit from './Unit'


const UnitList = props => {
    console.log(props)
    return (
        <div className="unit-list">
            {props.units.map((unit, index) => (
                <Unit key={index} unit={unit} onEditUnit={props.onEditUnit} />
            ))}
        </div>
    )
}

export default UnitList