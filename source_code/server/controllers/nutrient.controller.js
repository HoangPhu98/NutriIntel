const NutrientHelper = require('../helpers/nutrient.helper');
const {validationResult } = require('express-validator');
const xlsxtojson = require('xlsx-to-json-lc')

const create = (req, res) => {
    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    NutrientHelper.create(req.body).then((result) => {
        if(result.err) {
            res.json({success: false, data: undefined, message: "not ok"})
            return
        }
        res.json({
            success: true,
            data: result.createdNutrient,
            message: "ok"
        });
    });
}

const getAll = (req, res) => {
    NutrientHelper.retrieve().then(result => {
        if(result.err) {
            res.json({success: false, data: undefined, message: "not ok"})
            return
        }
        res.json({
            success: true,
            data: result.nutrients,
            message: "ok"
        });
    });
}

const removeById = (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let id = parseInt(req.params.id)
    NutrientHelper.remove(id).then(result => {
        if(result.err) {
            res.json({success: false, data: undefined, message: "not ok" + result.err})
            return
        }
        res.json({
            success: true,
            data: undefined,
            message: "ok"
        });
    })
}

const update = (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let id = parseInt(req.params.id)
    let infoUpdate = {}
    let flagEnableUpdate = false
    if(req.body.code !== undefined) {
        infoUpdate.code = req.body.code;
        flagEnableUpdate = true;
    }
    if(req.body.nameVi !== undefined) {
        infoUpdate.nameVi = req.body.nameVi;
        flagEnableUpdate = true;
    }
    if(req.body.nameEn !== undefined) {
        flagEnableUpdate = true
        infoUpdate.nameEn = req.body.nameEn;
    }
    if(req.body.description !== undefined) {
        flagEnableUpdate = true
        infoUpdate.description = req.body.description;
    }
    
    if(!flagEnableUpdate) {
        return res.json({
                success: false, 
                data: undefined, 
                message: "no data to update nutrient"
            });
    }
    NutrientHelper.update(id, infoUpdate).then(result => {
        if(result.err) {
            res.json({success: false, data: undefined, message: "not ok" + result.err})
            return
        }
        res.json({
            success: true,
            data: undefined,
            message: "ok"
        });
    })
}

const importData = (req, res) => {
    if(!req.files.file) {
        res.status(400).json({
            status: false,
            message: 'None file',
            data: undefined
        })
        return
    }

    let exceltojson;
    let file = req.files.file
    let fileName = req.files.file.name

    file.mv('./uploads/' + fileName, (err) => {
        if(err) {
            console.log('error saving')
        } else {
            console.log('file has saved')
            if(fileName.split('.')[fileName.split('.').length-1] === 'xlsx') {
                exceltojson = xlsxtojson
            }
            console.log("asdasd")
            try{
                exceltojson({
                    input: './uploads/' + fileName,
                    output: null,
                    lowerCaseHeaders: true
                }, (err, result) => {
                    if(err) {
                        res.status(400).json({status: false, message: err, data: undefined})
                        return
                    }
                    let nutrients = []

                    result.forEach(item => {
                        let nutrient = {
                            code: item.code,
                            nameVi: item.namevi,
                            nameEn: item.nameen,
                            description: item.description,
                            unitCode: item.unitcode
                        }
                        nutrients.push(nutrient)
                    });

                    NutrientHelper.createMulti(nutrients).then(data => {
                        if(data.err != undefined) {
                            res.json({success: false, message: "has unique field", data: undefined})
                        } else {
                            res.json({success: true, message: "ok", data: data.createdNutrients})
                        }
                    })

                    var fs = require('fs')
                    try{
                        fs.unlinkSync('./uploads/' + fileName)
                    } catch(e) {
                        console.log("error while delete file")
                    }
                })
            } catch(e) {
                console.log(err);
                res.json({success: false, message: 'Interupt excel file'});
            }
        } 
    })
}

module.exports = {
    create,
    getAll,
    removeById,
    update,
    importData,
}