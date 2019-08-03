const { check, validationResult } = require('express-validator');

module.exports = {
    
    createNutrient: [check("name").isString().exists()]


       
}