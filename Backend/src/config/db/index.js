const mongoose = require('mongoose');

async function connect () {
    try {
        await mongoose.connect('mongodb://localhost:27017/bookingcare')
        console.log('Ket noi server thanh cong');
    } catch (error) {
        console.log('Ket noi server that bai');
    }
}

module.exports = connect;