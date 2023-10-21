const express = require("express");
const db = require("./config/db");
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

db.then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
