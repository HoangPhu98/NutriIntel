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
                        if(index > 0) {
                            let food = {
                                nameVi: item.name,
                                nameEn: item.generalName,
                                description: item.description
                            }
                            foods.push(food)
                        }
                    })
                    
                    res.json({data: foods, total: result.length})
                    return
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