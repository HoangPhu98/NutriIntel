class FoodViewModel {
    constructor(foodStore) {
        this.store = foodStore
    }

    getFoods() {
        return this.store.getFoods()
    }

    createFood(food) {
        this.store.addFood(food)
    }

    deleteFood(food) {
        this.store.deleteFood(food)
    }
}

export default FoodViewModel