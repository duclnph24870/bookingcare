const express = require('express');
const route = express.Router();
const userController = require('../app/controller/userController.js')

route.post('/create',userController.createUser);
route.put('/edit',userController.editUser);
route.delete('/delete',userController.deleteUser);
route.post('',userController.getUser);

module.exports = route;