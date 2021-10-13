const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      // useCreatendex: true,
      // useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('{:DB:} Connected ready...');
  } catch (error) {
    console.log('{:DB:} Error');
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectdb;
