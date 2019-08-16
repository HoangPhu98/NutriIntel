const UnitHelper = require('../helpers/unit.helper');
const {validationResult} = require('express-validator');
const xlsxtojson = require('xlsx-to-json-lc');

const create = (req, res) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    UnitHelper.create(req.body).then((result) => {
        console.log(result)
        if(result.err) {
            console.log(result.err);
            res.json({
                success: false,
                data: undefined,
                message: "not ok"
            });
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
    UnitHelper.retrieveAll().then(result => {
        if(result.err) {
            console.log(result.err);
            res.json({
                success: false,
                data: undefined,
                message: "not ok"
            });
            return
        }
        res.json({
            success: true,
            data: result.units,
            message: "ok"
        });
    });
}

const getById = (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    let id = parseInt(req.params.id);
    UnitHelper.retrieveOne(id).then(result => {
        if(result.err) {
            console.log(result.err);
            res.json({
                success: false,
                data: undefined,
                message: "not ok"
            });
            return
        }
        res.json({
            success: true,
            data: result.unit,
            message: "ok"
        });
    });
}

const update = (req, res) => {
    let errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    }

    let id = parseInt(req.params.id);
    let infoUpdate = {}
    let flagEnableUpdate = false;
    if(req.body.nameVi !== undefined) {
        infoUpdate.nameVi = req.body.nameVi;
        flagEnableUpdate = true;
    }
    if(req.body.nameEn !== undefined) {
        infoUpdate.nameEn = req.body.nameEn;
        flagEnableUpdate = true;
    }
    if(req.body.notation != undefined) {
        flagEnableUpdate = true;
        infoUpdate.notation = req.body.notation;
    }
    if(req.body.note != undefined) {
        flagEnableUpdate = true;
        infoUpdate.note = req.body.note;
    }

    if(!flagEnableUpdate) {
        return res.json({
            success: false,
            data: undefined,
            message: "no data to update unit"
        })
    }

    UnitHelper.update(id, infoUpdate).then(result => {
        if(result.err) {
            res.json({
                success: false,
                data: undefined,
                message: "not ok" + result.err
            })
        }
        res.json({
            success: true,
            data: undefined,
            message: "ok"
        })
    })
}

const removeById = (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    let id = parseInt(req.params.id);
    UnitHelper.remove(id).then(result => {
        if(result.err) {
            res.json({success: false, data: undefined, message: "not ok" + result.err})
            return;
        }
        res.json({
            success: true,
            data: undefined,
            message: "ok"
        })
    });
}

const importData = (req, res) => {
    if(!req.files.file) {
        res.status(400).json({
            status: false,
            message: 'None file',
            data: undefined
        })
        return;
    }

    let exceltojson;
    let file = req.files.file;
    let fileName = req.files.file.name;

    file.mv('./uploads/' + fileName, (err) => {
        if(err) {
            console.log('error saving');
        } else {
            console.log('saved');
            if(req.files.file.name.split('.')[fileName.split('.').length-1] === 'xlsx') {
                exceltojson = xlsxtojson;
            }
            try{
                exceltojson({
                    input: './uploads/' + fileName,
                    output: null,
                    lowerCaseHeaders: true
                }, (err, result) => {
                    if(err) {
                        res.status(400).json({errorCode: 1, errDesc: err, data: null});
                        return
                    }

                    let units = [];
                    result.forEach(element => {
                        let unit = {
                            nameVi: element.namevi,
                            nameEn: element.nameen,
                            notation: element.symboy,
                            note: element.note
                        }
                        units.push(unit);
                    });

                    UnitHelper.createMulti(units).then(data => {
                        if(data.err != undefined) {
                            res.json({success: false, message: "has unique field", data: undefined})
                        } else {
                            res.json({success: true, message: "ok", data: data.createdUnits})
                        }
                    })
                    
                    // Remove file when read success
                    var fs = require('fs');
                    try{
                        fs.unlinkSync('./uploads/' + fileName);
                    } catch (e) {
                        console.log("error delete file");
                    }
                });
            } catch(e) {
                console.log(err);
                res.json({success: false, message: 'Interupt excel file'});
            }
        }
    });


}

module.exports = {
    create,
    getAll,
    getById,
    update,
    removeById,
    importData,
}