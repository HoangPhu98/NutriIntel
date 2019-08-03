'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Field = new Schema({
    key: String,
    name: String,
    unit_1: String,
    unit_2: String
});

var Units = new Schema({
    fields: [Field]
});

module.exports = mongoose.model('units', Units);

// {
//     fields: [{
//             key: 'name',
//             name: 'Name',
//             unit_1: '',
//             unit_2: ''
//         }, {
//             key: 'generalName',
//             name: 'General Name',
//             unit_1: '',
//             unit_2: ''
//         }, {
//             key: 'type',
//             name: 'Type',
//             unit_1: '',
//             unit_2
//         }, {
//             key: 'amount',
//             name: 'Amount',
//             unit_1: 'g',
//             unit_2: 'gram'
//         }, {
//             key: 'energyC',
//             name: 'Energy calo',
//             unit_1: 'cal',
//             unit_2: 'calories'
//         }, {
//             key: 'energyJ',
//             name: 'Energy kJ',
//             unit_1: 'kJ',
//             unit_2: 'kilojoules'
//         }, {
//             key: 'protein',
//             name: 'Protein',
//             unit_1: 'g',
//             unit_2: 'gram'
//         }, {
//             key: 'fat',
//             name: 'Fat',
//             unit_1: 'g',
//             unit_2: 'gram'
//         }, {
//             key: 'carbohydrate',
//             name: 'Carbohydrate',
//             unit_1: 'g',
//             unit_2: 'gram'
//         }, {
//             key: 'fiber',
//             name: 'Fiber',
//             unit_1: 'g',
//             unit_2: 'gram'
//         }, {
//             key: 'ash',
//             name: 'Ash',
//             unit_1: 'g',
//             unit_2: 'gram'
//         }, {
//             key: 'totalSugar',
//             name: 'Total Sugar',
//             unit_1: 'g',
//             unit_2: 'gram'
//         }, {
//             key: 'calcium',
//             name: 'Calcium',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'iron',
//             name: 'Iron',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'magnesium',
//             name: 'Megie',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'manganese',
//             name: 'Mangan',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'phosphorous',
//             name: 'Photpho',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'patassium',
//             name: 'Kali',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'sodium',
//             name: 'Natri',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'zinc',
//             name: 'Zinc',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'copper',
//             name: 'Copper',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         }, {
//             key: 'selenium',
//             name: 'Selenium',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         }, {
//             key: 'vitaminC',
//             name: 'Vitamin C',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'vitaminB1',
//             name: 'Vitamin B1',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'vitaminB2',
//             name: 'vitamin B2',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'vitaminPP',
//             name: 'Vitamin PP',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'vitaminB5',
//             name: 'Vitamin B5',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'vitaminB6',
//             name: 'vitamin B6',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         }, {
//             key: 'folate',
//             name: 'Folate',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         }, {
//             key: 'vitaminB9',
//             name: 'Vitamin B9',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         }, {
//             key: 'vitaminH',
//             name: 'Vitamin H',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         }, {
//             key: 'vitaminB12',
//             name: 'Vitamin B12',
//             unit_1: 'mcg',
//             unit_2: 'micogram'
//         }, {
//             key: 'vitaminA',
//             name: 'Vitamin A',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         }, {
//             key: 'vitaminD',
//             name: 'Vitamin D',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         },
//         {
//             key: 'vitaminE',
//             name: 'Vitamin E',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         },
//         {
//             key: 'vitaminK',
//             name: 'Vitamin K',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         },
//         {
//             key: 'betaCaroten',
//             name: 'Beta-Caroten',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         },
//         {
//             key: 'alphaCaronten',
//             name: 'Alpha-Cartoten',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         },
//         {
//             key: 'lycopen',
//             name: 'Lyconpen',
//             unit_1: 'mcg',
//             unit_2: 'microgram'
//         }, {
//             key: 'totalIsoflavone',
//             name: 'Total Isoflavone',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         },
//         {
//             key: 'totalAcid',
//             name: 'Total Acid',
//             unit_1: 'g',
//             unit_2: 'gram'
//         },
//         {
//             key: 'cholesterol',
//             name: 'cholesterol',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         },
//         {
//             key: 'phytosterol',
//             name: 'phytosterol',
//             unit_1: 'mg',
//             unit_2: 'miligram'
//         },
//     ]
// }