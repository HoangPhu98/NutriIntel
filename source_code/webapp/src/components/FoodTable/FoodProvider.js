import React from 'react'
import {inject} from 'mobx-react'
import FoodController from '../../controllers/FoodController'
import FoodViewModel from '../../viewmodels/FoodViewModel'
import RootStore from '../../models/RootStotre'

@inject(RootStore.type.FOOD_MODEL)
class FoodProvider extends React.Component {
    constructor(props) {
        super(props)
        const foodModel =  props[RootStore.type.FOOD_MODEL]
        this.viewModel = new FoodViewModel(foodModel)
    }

    render() {
        return (
            <FoodController viewModel={this.viewModel} />
        )
    }
}

export default FoodProvider