const mongoose = require("mongoose");

const MONGO_URI = 'mongodb+srv://gayatribirthare5:wyHYxTOGTNSaKCFa@cluster0.jrf69qi.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(MONGO_URI,  { useNewUrlParser: true });





// const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};