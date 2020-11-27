const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DATABASE,
} = process.env;

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successfully!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database connection error!");
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
