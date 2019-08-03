const MealPlan = require('../model/Menu.model')
const xlsx = require('xlsx')

const create = (req, res, next) => {
    console.log(req.body)
    //Process from form


}

const searchAll = (req, res, next) => {
    MealPlan
    .find({})
    .exec((err, allPlan) => {
        if(err) {
            return next(err)
        }else{
            res.json(allPlan)
        }
    })
}

const updateOne = (req, res, next) => {
    
}

const deleteOne = (req, res, next) => {

}

const importData = (req, res, next) => {
    let workbook = xlsx.readFile('uploads/' + req.file.filename)
    let sheet_name_list = workbook.SheetNames
    let xData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    let tempVal
    xData.map((value, key) => {
        if(key !== 0) {
            if(key % 2 === 0) {
                let item = {
                    name: tempVal.name,
                    description: tempVal.description,
                    createAt: new Date(),
                    ingredient: {
                        energyC: [tempVal.energyC, value.energyC],
                        energyJ: [tempVal.energyJ, value.energyJ],
                        protein: [tempVal.protein, value.protein],
                        fat: [tempVal.fat, value.fat],
                        carbohydrate: [tempVal.carbohydrate, value.carbohydrate],
                        fiber: [tempVal.fiber, value.fiber],
                        ash: [tempVal.ash, value.ash],
                        totalSugar: [tempVal.totalSugar, value.totalSugar],
                        calcium: [tempVal.calcium, value.calcium],
                        iron: [tempVal.iron, value.iron],
                        magnesium: [tempVal.magnesium, value.magnesium],
                        manganese: [tempVal.manganese, value.manganese],
                        phosphorous: [tempVal.phosphorous, value.phosphorous],
                        patassium: [tempVal.patassium, value.patassium],
                        sodium: [tempVal.sodium, value.sodium],
                        zinc: [tempVal.zinc, value.zinc],
                        copper: [tempVal.copper, value.copper],
                        selenium: [tempVal.selenium, value.selenium],
                        vitaminC: [tempVal.vitaminC, value.vitaminC],
                        vitaminB1: [tempVal.vitaminB1, value.vitaminB1],
                        vitaminB2: [tempVal.vitaminB2, value.vitaminB2],
                        vitaminPP: [tempVal.vitaminPP, value.vitaminPP],
                        vitaminB5: [tempVal.vitaminB5, value.vitaminB5],
                        vitaminB6: [tempVal.vitaminB6, value.vitaminB6],
                        folate: [tempVal.folate, value.folate],
                        vitaminB9: [tempVal.vitaminB9, value.vitaminB9],
                        vitaminH: [tempVal.vitaminH, value.vitaminH],
                        vitaminB12: [tempVal.vitaminB12, value.vitaminB12],
                        vitaminA: [tempVal.vitaminA, value.vitaminA],
                        vitaminD: [tempVal.vitaminD, value.vitaminD],
                        vitaminE: [tempVal.vitaminE, value.vitaminE],
                        vitaminK: [tempVal.vitaminK, value.vitaminK],
                        betaCaroten: [tempVal.betaCaroten, value.betaCaroten],
                        alphaCaroten: [tempVal.alphaCaroten, value.alphaCaroten],
                        lycopen: [tempVal.lycopen, value.lycopen],
                        totalIsoflavone: [tempVal.totalIsoflavone, value.totalIsoflavone],
                        totalAcid: [tempVal.totalAcid, value.totalAcid],
                        cholesterol: [tempVal.cholesterol, value.cholesterol],
                        phytosterol: [tempVal.phytosterol, value.phosphorous]
                    }
                }

                /**
                 * Validate data in here
                 */
                console.log(item);
                let record = new MealPlan(item)
                record.save(err => {
                    if(err) {
                        return next(err)
                    }
                })
            }else{
                tempVal = value;
            }
        }
    })

    res.json({status: 'ok'})
}

module.exports = {
    create,
    searchAll,
    updateOne,
    deleteOne,
    importData
}