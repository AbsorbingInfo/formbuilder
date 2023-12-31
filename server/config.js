const mongoose = require('mongoose');

const configureDb = async() => {
  try {
    console.log(process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log(`Database successfully connected`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = configureDb;