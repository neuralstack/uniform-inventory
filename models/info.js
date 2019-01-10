var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var InfoSchema = new Schema({
    last_number:  Number
    
  });

  module.exports = mongoose.model('infos',InfoSchema);