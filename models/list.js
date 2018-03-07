const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  list: {
    type: Schema.ObjectId,
    ref: 'Task'
  }

});

const List = mongoose.model('List', listSchema);
module.exports = List;