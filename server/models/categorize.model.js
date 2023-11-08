const mongoose = require('mongoose');
const Schema = mongoose.Schema

const categorizeSchema = new Schema({
  question: { 
    type: String, 
    required: true 
  },
  img: {
    type: String,
    required: false,
  },
  categories: [
    {
      id: { 
        type: Number, 
        required: true 
      },
      category: { 
        type: String, 
        required: true 
      },
    },
  ],
  options: [
    {
      id: { 
        type: Number, 
        required: true 
      },
      option: { 
        type: String, 
        required: true 
      },
      belongsTo: { 
        type: String, 
        required: true 
      },
    },
  ],
  isRequired: { 
    type: Boolean,
    default: false 
  }
});

module.exports = mongoose.model('categorizes', categorizeSchema)