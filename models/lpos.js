var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var LpoSchema = new Schema({
    client:  String,
    date: String,
    lpo_number:   String,
    ref: String,
    items_array: String,
    flag:String,
    vendor:  String,
    purchase_array :String,
    recieved_array:String,
    po_num: String,
    requisitioner: String	
    
  });

  module.exports = mongoose.model('lpos',LpoSchema);