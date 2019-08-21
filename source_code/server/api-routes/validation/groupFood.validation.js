const {check} = require('express-validator')

module.exports = {
    createGroup: [
        check('code').isString().exists(),
        check('name').isString().exists(),
        check('description').isString().optional()
    ],
    onlyGroupId: [
        check('id').isNumeric().exists()
    ],
    updateGroup: [
        check('id').isNumeric().exists(),
        check('code').isString().optional(),
        check('name').isString().optional(),
        check('description').isString().optional()
    ]
}