const mongoose = require('mongoose');

let countrySchema = mongoose.Schema({
    name: String,
    capital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
    },
});

let citySchema = mongoose.Schema({
    name: String,
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
    },
    location: {
        lat: String,
        lng: String,
    },
});

citySchema.virtual('isCapital').get(function () {
    return Object.isEqual(this._id, this.country.capital._id);
});

let Country = mongoose.model('country', countrySchema);
let City = mongoose.model('city', citySchema);

module.exports = {Country, City};