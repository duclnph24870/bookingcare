const express = require('express');
const app = express();

const db = require('./config/db');
const cors = require('cors');
const routes = require('./router');
const port = 3333;

// cấp quyền domain truy cập
app.use(cors({ origin: true }));
app.use(express.urlencoded({extended: true}),express.json());

// kết nối database
db();

// route
routes(app);

app.listen(port);

console.log('React.JS App is running on the port ' + port);