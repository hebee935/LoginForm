var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
  name: String,
  id: String,
  pw: String
});

memberSchema.methods.validPassword = function(pw){
  return compareSync(pw, this.local.password);
};

module.exports = mongoose.model('Member',memberSchema);
