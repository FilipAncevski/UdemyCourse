const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.use((req, res, next) => {
  const { password } = req.query;
  if (password === "nocoffee") {
    return next();
  }
  return res.status(404).send("Wrong password");
});

// app.use((req, res, next) => {
//   req.timeRequested = Date.now();
//   next();
// });

// app.use((req, res, next) => {
//   console.log("My first middleware");
//   return next();
// });

// app.use((req, res, next) => {
//   console.log("My SECOND middleware");
//   return next();
// });

app.get("/", (req, res) => {
  console.log(req.timeRequested);
  res.send("Welcome");
});

app.get("/dogs", (req, res) => {
  res.send("Woof woof");
});

app.use((req, res) => {
  return res.status(404).send("Not Found!");
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  return console.log("Server listening on port 3000");
});
