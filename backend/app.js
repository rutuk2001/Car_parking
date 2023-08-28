const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./index");

const connectionString = "mongodb://127.0.0.1:27017/Parking";

mongoose
  .connect(connectionString)
  .then((res) => console.log("Connected to db successfully"))
  .catch((ex) => console.log(ex));

const userRoute = require("./Routes/userRoutes");
const app = express();
const corsOptions = {
  exposedHeaders: ["x-auth-token", "Authorization"],
};

app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.use("/", routes);

app.listen(3001, () => console.log("Listening on port 3001....."));
