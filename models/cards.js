var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardsSchema = new Schema({
    cardArr: Array,
    percentage: Number
});

module.exports = mongoose.model('cards', CardsSchema);