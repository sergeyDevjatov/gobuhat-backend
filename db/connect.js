let mongoose = require('mongoose');

module.exports = async (url) => {
    mongoose.connect(url);

    if(process.env.MONGO_CLEAR) {
        await mongoose.connection.dropDatabase();
    }
};