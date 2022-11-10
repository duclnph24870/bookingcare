const express = require('express');
const route = express.Router();
const userController = require('../app/controller/userController.js')

route.post('',userController.getUser);

module.exports = route;