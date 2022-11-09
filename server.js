const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ip = require("ip");
const things = require("./routes/things");

app.use(cors());
app.use(express.json());

const IP = ip.address();
const PORT = process.env.port || 4444;

mongoose.connect("mongodb://localhost:27017/DataBase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("DataBase Connected!"));

app.use("/things", things);

app.get("/", (req, res) => {
  res.send("Root Directory");
});

app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
