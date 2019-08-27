const FoodHelper = require('../helpers/food.helper')
const xlsxtojson = require('xlsx-to-json-lc')

const importData = (req, res) => {
    if(!req.files.file) {
        res.status(400).json({
            status: false,
            message: 'none file',
            data: undefined
        })
        return
    }

    let exceltojson;
    let file = req.files.file
    let fileName = req.files.file.name

    file.mv('./uploads/' + fileName, (err) => {
        if(err) {
            console.log('error temp saving on server side')
        } else {
            console.log('file has saved')
            if(fileName.split('.')[fileName.split('.').length-1] === 'xlsx') {
                exceltojson = xlsxtojson
            }

            try {
                exceltojson({
                    input: './uploads/' + fileName,
                    output: null,
                    lowerCaseHeader: true
                }, (err, result) => {
                    if(err) {
                        res.status(400).json({status: false, message: err, data: undefined})
                        return
                    }

                    let foods = []
                    result.forEach((item, index) => {
                        if(index > 1) {
                            let food = {}
                            let nutrients = []
                            Object.keys(item).map(function(key, index) {
                                switch (key) {
                                    case "stt":
                                    case "amount":                             
                                        break;
                                    case "nameEn":
                                        food[key] = item[key]
                                        break;
                                    case "nameVi": 
                                        food[key] = item[key]
                                        break
                                    case "code":
                                        food["foodCode"] = item[key]
                                        break
                                    case "group":
                                        food["groupCode"] = item[key]
                                        break
                                    case "description":
                                        food[key] = item[key]
                                        break
                                    default:
                                        let nutrient = {
                                            foodCode: item["code"],
                                            nutrientCode: key,
                                            amount: item["amount"],
                                            value: parseFloat(item[key]),
                                        }
                                        nutrients.push(nutrient)
                                        break;
                                }
                            });
                            
                            food["nutrients"] = nutrients
                            // let food = {
                            //     foodCode: item.code,
                            //     nameVi: item.nameVi,
                            //     nameEn: item.nameEn,
                            //     groupCode: item.group,
                            //     description: item.description
                            // }

                            

                            foods.push(food)
                        }
                    })
                    
                    // res.json({data: foods, total: result.length})
                    // return
                    FoodHelper.createMulti(foods).then(data => {
                        if(data.err !== undefined) {
                            res.json({success: false, message: 'hahs unique field', data: undefined})
                        } else {
                            res.json({success: true, message: 'ok', data: data.createdFoods})
                        }
                    })

                })
            } catch(err) {
                console.log(err)
                res.json({success: false, message: 'interupt excel file', data: undefined})
            }
        } 
    })

}

module.exports = {
    importData,
}