const Joi = require('joi');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new mongoose.Schema({
    firstname: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50,
    },
    lastname: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50,

    },
    email: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 255,
        unique: true
    },
   
    password: {
        type: String,
        required: false,
        minlength: 6,
        maxlength: 1024
    }

}); 

module.exports = mongoose.model('user', User);

