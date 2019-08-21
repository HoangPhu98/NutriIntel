import ListAPI from "../util"
import axios from 'axios';

class FoodService {
    async retrieveFoods() {
        const res = await axios({
            method: 'get',
            url: ListAPI.filterFoodTableAPI,
            responseType: 'json'
        })

        return Promise.resolve(res.data)
    }

    async importFoods(data) {
        const res = await axios({
            method: 'post',
            url: ListAPI.importFoodTableAPI,
            responseType: 'json',
            data: data
        })

        return Promise.resolve(res.data)
    }
}

export default FoodService;