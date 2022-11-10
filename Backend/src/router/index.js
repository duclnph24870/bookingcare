const userRoute = require('./userRoute.js');
const authRoute = require('./authRoute.js');

function routes (app) {
    app.use('/user',userRoute);
    app.use('/auth',authRoute);
}

module.exports = routes;