const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv/config')

const things = require("./routes/things");

app.use(cors());
app.use(express.json());

const PORT = process.env.port || 4444;

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("DataBase Connected!"));

app.use("/things", things);

app.get("/", (req, res) => {
  res.send("Root Directory");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
