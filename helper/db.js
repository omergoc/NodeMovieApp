const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/MovieApp');
    mongoose.connection.on('open', () => {
        console.log("MongoDB: Baglantı Basarılı");
    });

    mongoose.connection.on('error', (err) => {
    console.log("MongoDB: Baglantı Hatalı",err);
    });
    
    mongoose.Promise = global.Promise;
};