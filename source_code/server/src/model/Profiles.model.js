const mongoose = require('mongoose')
const Schema = mongoose.Schema
var Profile = new Schema({
    name: String,
    address: String,
    age: Number,
    gender: String,
    weight: Number,
    Height: Number,
    phone: String,
    activity: Boolean
})

module.exports = mongoose.model('profiles', Profile)