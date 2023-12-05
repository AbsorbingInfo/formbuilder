const mongoose = require('mongoose');
const Schema = mongoose.Schema

const clozeSchema = new Schema({
  question: { 
    type: String, 
    required: true 
  },
  img: {
    type: Buffer,
    required: false,
  },
  dashs:[{
    id: { 
      type: Number, 
      required: true 
    },
    value: { 
      type: String, 
      required: true 
    }
  }],
  isRequired: { 
    type: Boolean, 
    default: false 
  },
});

module.exports = mongoose.model('clozes', clozeSchema)