var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var VendorSchema = new Schema({
    name:  String,
    company_name: String,
    street:   String,
    city:   String,
    phone:   String

  });

  module.exports = mongoose.model('vendors',VendorSchema);