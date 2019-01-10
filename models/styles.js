var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var StyleSchema = new Schema({
    title:  String,
    fabric_code: String,
    size:   String,
    details: String,
    measurements:   String,
    embroidry: String,
    logo:   String,
    gender:String

  });

  module.exports = mongoose.model('styles',StyleSchema);