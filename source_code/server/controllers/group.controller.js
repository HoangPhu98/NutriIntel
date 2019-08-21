const GroupHelper = require('../helpers/groupFood.helper')
const xlsxtojson = require('xlsx-to-json-lc')
const {validationResult} = require('express-validator')

const create = (req, res) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    GroupHelper.create(req.body).then(result => {
        if(result.err) {
            console.log(result.err)
            res.json({
                success: false,
                data: undefined,
                message: "not ok"
            })
            return
        }
        res.json({
            success: true,
            data: result.createdGroup,
            message: "ok"
        })
    })
}

const importData = (req, res) => {
    if(!req.files.file) {
        res.status(400).json({
            status: false,
            message: "none file",
            data: undefined
        })
        return
    }

    let exceltojson
    let file = req.files.file
    let fileName = req.files.file.name

    file.mv('./uploads/' + fileName, err => {
        if(err) {
            console.log('error saving')
        } else {
            console.log('file group food has saving')
            if(fileName.split('.')[fileName.split('.').length-1] === "xlsx") {
                exceltojson = xlsxtojson
            }

            try {
                exceltojson({
                    input: './uploads/' + fileName,
                    output: null,
                    lowerCaseHeaders: true
                }, (err, result) => {
                    if(err) {
                        res.status(400).json({
                            status: false,
                            message: err,
                            data: undefined
                        })
                        return
                    }

                    let groups = []
                    result.forEach((item, index) => {
                        if(index > 0) {
                            let group = {
                                code: item.code,
                                name: item.name,
                                description: item.description
                            }
                            groups.push(group)
                        }
                    })
                    
                    GroupHelper.createMulti(groups).then(data => {
                        if(data.err != undefined) {
                            res.json({success: false, message: "has err" + err, data: undefined})
                        } else {
                            res.json({success: true, message: "ok", data: data.createdGroups})
                        }
                    })

                    var fs = require('fs');
                    try{
                        fs.unlinkSync('./uploads/' + fileName);
                    } catch (e) {
                        console.log("error delete file");
                    }
                })
            } catch (err) {
                console.log(err);
                res.json({success: false, message: 'Interupt excel file'});
                return
            }
        }
    })
}

const update = (req, res) => {
    let errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    }

    let id = parseInt(req.params.id);
    let infoUpdate = {}
    let flagEnableUpdate = false;

    if(req.body.code !== undefined) {
        infoUpdate.code = req.body.code;
        flagEnableUpdate = true;
    }
    if(req.body.name !== undefined) {
        infoUpdate.name = req.body.name;
        flagEnableUpdate = true;
    }
    if(req.body.description !== undefined) {
        infoUpdate.description = req.body.description;
        flagEnableUpdate = true;
    }

    if(!flagEnableUpdate) {
        return res.json({
            success: false,
            data: undefined,
            message: "no data to update unit"
        })
    }

    GroupHelper.update(id, infoUpdate).then(result => {
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

const deleteOne = (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    let id = parseInt(req.params.id);
    GroupHelper.deleteOne(id).then(result => {
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

const getAll = (req, res) => {
    GroupHelper.retrieveAll().then(result => {
        if(result.err) {
            console.log(result.err)
            res.json({
                success: false,
                data: undefined,
                message: "not ok"
            });
            return
        }
        res.json({
            success: true,
            data: result.groups,
            message: "ok"
        });
    })
}

module.exports = {
    create,
    importData,
    update,
    deleteOne,
    getAll,
}