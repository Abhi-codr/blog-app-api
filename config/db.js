const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONN_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
