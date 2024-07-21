require("dotenv").config();
const mongoose = require("mongoose");
const url = `mongodb+srv://rajat397:QJ9422LXKIgX8aNI@cluster0.aixfs41.mongodb.net/MiniProject`;

mongoose
  .connect(url)
  .then(() => {
    console.log("database connected ");
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error is there");
    console.log(err);
  });
