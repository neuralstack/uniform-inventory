var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var JobSchema = new Schema({
    ref:  String,
    number: String,
    product:   String,
    style:   String,
    quantity : Number,
    printed : Number,
    cutting : Number,
    stitching : Number,
    packing : Number,
    delivery : Number,
    starting_number : Number


  });

  module.exports = mongoose.model('job_slips',JobSchema);