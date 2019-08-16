const NutrientHelper = require('../helpers/nutrient.helper');
const {validationResult } = require('express-validator');

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
            data: result.returnValue,
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
    res.json({
        success: false,
        data: undefined,
        message: "no data to import"
    })
}

module.exports = {
    create,
    getAll,
    removeById,
    update,
    importData,
}