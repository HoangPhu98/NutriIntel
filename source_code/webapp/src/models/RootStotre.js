import FoodModel from './domain/FoodModel'

class RootStore {
    static type = {
        FOOD_MODEL: 'foodModel'
    }

    constructor() {
        this.foodModel = new FoodModel()
    }

    getStores = () => ({
        [RootStore.type.FOOD_MODEL]: this.foodModel
    })

}

export default RootStore