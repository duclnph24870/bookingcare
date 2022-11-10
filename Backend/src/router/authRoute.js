const express = require('express');
const route = express.Router();
const userController = require('../app/controller/userController.js')

route.post('/login',userController.handleLogin);

module.exports = route;