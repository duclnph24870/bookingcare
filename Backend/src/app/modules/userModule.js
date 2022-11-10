const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    userName: {type: String},
    age: {type: Number},
    email: {type: String},
    password: {type: String},
    role: {type: Number},
    timeCreate: {type: Date, default: Date.now()},
    timeUpdate: {type: Date, default: Date.now()},
}, {
    collection: 'users'
});

module.exports = mongoose.model("User",User)