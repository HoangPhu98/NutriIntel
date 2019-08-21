import {observable, action} from 'mobx'

class FoodModel {
    @observable foods = []

    @action createFood(food) {
        
    }

    @action deleteFood(food) {
        this.foods.clear()
    }

    retrieveFoods() {
        return this.foods
    }
}

export default FoodModel