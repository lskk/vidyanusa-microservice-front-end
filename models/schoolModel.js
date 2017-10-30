var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SchoolSchema = Schema({

},{collection: 'sekolah'});



//Export model
module.exports = mongoose.model('sekolah', UserSchema);
