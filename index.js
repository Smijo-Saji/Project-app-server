require("dotenv").config();
require("./db/connection");
// server using express
const express = require("express");

const ServerApp = express();
//cors - connnect with front end
const cors = require("cors");
ServerApp.use(cors());

//convert all incomming json data to js
ServerApp.use(express.json());

//connect with router
const router = require("./Routes/routes");
ServerApp.use(router);

//export a folder to client app(backedn to frontend) - using express.static
//("/foldername to access on frontend",express.use("folder path on backend "))
ServerApp.use("/images", express.static("./uploads"));

//port set - listen

const PORT = 8001 || process.env.PORT;

ServerApp.listen(PORT, () => {
  console.log("Server Started......");
});

//resolve api request
// ServerApp.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

// ServerApp.post("/postex", (req, res) => {
//   res.json(`post request received${req.body.username}`);
// });

// ServerApp.post("/postex2", (req, res) => {
//   res.status(400).json("invalid username");
// });
