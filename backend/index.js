const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routerIndex = require("./routes/index");
const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/v1", routerIndex);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("App listening on PORT", PORT);
});






