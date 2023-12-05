const mongoose = require('mongoose');
const Schema = mongoose.Schema

const comprehensionSchema = new Schema({
  description: { 
    type: String, 
    required: true 
  },
  img: {
    type: Buffer,
    required: false,
  },
  mcqs: [
    {
      id: {
        type: Number,
        required: true
      },
      question: { 
        type: String, 
        required: true 
      },
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
          isCorrect: { 
            type: Boolean, 
            required: true 
          },
        },
      ],
    },
  ],
  isRequired: { 
    type: Boolean, 
    default: false 
  },
});

module.exports = mongoose.model('comprehensions', comprehensionSchema)