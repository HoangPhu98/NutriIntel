const {check} = require('express-validator');

module.exports = {
    createUnit: [
        check('code').isString().exists(),
        check('nameVi').isString().exists(),
        check('nameEn').isString().exists(),
        check('notaion').isString().exists(),
        check('note').isString().optional()
    ],
    onlyUnitId: [
        check('id').isNumeric().exists()
    ],
    updateUnit: [
        check('code').isString().optional(),
        check('nameVi').isString().optional(),
        check('nameEn').isString().optional(),
        check('notation').isString().optional(),
        check('note').isString().optional(),
        check('id').isNumeric().exists()
    ]
}