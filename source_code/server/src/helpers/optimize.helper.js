const MealPlan = require('../model/Menu.model')
const Price = require('../model/Price.model')
const NutrientValue = require('../model/NutrientValue.model')

const getNutrion = (foods, plan, weight) => {
    let result = {}
    Object.keys(plan).forEach(key => {
        if(key != '$init'){
            result[key] = 0
            foods.forEach(value => {
                weight.forEach(item => {
                    if(item[0] == value.food._id) {
                        result[key] += item[2] * value.food[key] 
                    }
                })
            })
        }
    })
    return result
}

const requestOpt = (req, res, next) => {  
    const {planId, planFoodId} = req.body
    
    MealPlan
    .find({_id: planId})
    .select("ingredient")
    .exec((err, _plan) => {
        if(!err) {
            // console.log(_plan)
            Price
            .find()
            .populate({
                path: 'food',
                model: NutrientValue
            })
            .exec((err, allFoods) => {
                if(!err) {
                    //Unicode (Tieng viet) trong du lieu lam qua tai buffer
                    const _foods = []

                    allFoods.forEach(item => {
                        let x = planFoodId.find(_id => _id == item.food._id)
                        if(x !== undefined) {
                            _foods.push(item)
                        }
                    
                    })
                    
                    const inp_food = JSON.stringify(_foods)
                    const inp_plan = JSON.stringify(_plan[0].ingredient)
                    
                    //URL: start to server folder
                    var spawn = require('child_process').spawn,
                        py = spawn('python', ['./controller/pythonModel/optimize2.py', inp_food, inp_plan])
                    
                    py.stdout.on(`data`, function (data) {
                        console.log("In child process!")
                        // console.log(data.toString())
                        let result = JSON.parse(data.toString())
                    
                        let information = {}
                        if(result.status == 1) {
                            information = {
                                status: 1,
                                text: "Kết quả cho tối ưu với cả 2 ràng buộc",
                                economic: {
                                    cost: result.cost,
                                    weight: result.weight
                                },
                                nutrition: getNutrion(_foods, _plan[0].ingredient, result.weight)
                            }
                        } else if(result.status == -1) {
                            information = {
                                status: -1,
                                text: "Thiếu loại dinh dưỡng nào đó"
                            }
                        } else if(result.status === 2) {
                            information = {
                                status: 2,
                                text: "Kết quả cho tối ưu với ràng buộc cận dưới",
                                economic: {
                                    cost: result.cost,
                                    weight: result.weight
                                },
                                nutrition: getNutrion(_foods, _plan[0].ingredient, result.weight),
                            }
                        }
                        
                        res.json(information);

                    });
                } else {
                    return next(err)
                }
            })
        } else {
            return next(err)
        }
    })
}


module.exports = {
    requestOpt,
}


            // const food = [{
            //     price: 300,
            //     food: {
            //         name: "Gạo nếp",
            //         energyC: 100,
            //         energyJ: 100,
            //         protein: 30}
            //     }, {
            //     price: 200,
            //     food: {
            //         name: "Thit bo",
            //         energyC: 80,
            //         energyJ: 80,
            //         protein: 50
            //     }}]

            // const conditionNutri = {
            //     energyC: [100, 500],
            //     energyJ: [100, 500],
            //     protein: [10, 20]
            // }

            // const inp_food = JSON.stringify(food)
            // const inp_plan = JSON.stringify(conditionNutri)