var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var Raw_ItemSchema = new Schema({
    name:  String,
    price: String,
    detail:   String
  });

  module.exports = mongoose.model('raw_items',Raw_ItemSchema);