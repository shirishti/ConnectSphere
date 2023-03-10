const express = require("express");
const app = express();
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDb = require("./utilsServer/connectDb");
connectDb();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Set the Access-Control-Allow-Origin header
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', "*");
//   next();
// });

nextApp.prepare().then(() => {
  // app.use("/api/signup", require("/api/signup"));
  // app.use("/api/auth", require("/api/auth"));
 

  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log("Express server running");
  });
});
