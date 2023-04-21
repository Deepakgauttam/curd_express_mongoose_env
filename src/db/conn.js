require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log("db not connected");
  });

// local mongodb connection  127.0.0.1:27017
// mongoose.connect('mongodb://127.0.0.1:27017/olympics')
// mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to db");
});
mongoose.connection.on("error", (e) => {
  console.log(e.message);
});
mongoose.connection.on("disconnected", () => {
  console.log("mongoose disconnected from db");
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

 