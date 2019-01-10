var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var ItemSchema = new Schema({
    name:  String,
    price: String,
    detail:   String
  });

  module.exports = mongoose.model('items',ItemSchema);