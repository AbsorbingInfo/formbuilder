const mongoose = require('mongoose');
const Schema = mongoose.Schema

const formSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer,
    required: false,
  }
});

module.exports = mongoose.model('forms', formSchema)