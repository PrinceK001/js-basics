// requiring package dependencies
const express = require("express");
const path = require("path");

// initializing app
const app = express();

// CORS 
const corsOption = require("./server/middlewares/corsOption");
app.use(corsOption);

// serve static files in case of root
app.use("/", express.static(path.join(__dirname, "./dist")));

// reverse string API
app.get("/reversestring", (req, res) => {
  res.send({ data: req.query.data.trim().split("").reverse().join("") });
})

// always redirect to root in case of invalid request
app.use("**", (req, res) => { res.redirect("/") });

// bootstraping app at specified port
const port = process.env.PORT || 8000;
const server = app.listen(port, (err) => {
  console.log("**********************************************************");
  err ? (console.log(err)) : (console.log("Started at : ", port));
});