const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// const data = [
//   {
//     author: "Mr.Jones",
//     commend:
//       "There is a man carrying 5 pounds of opium in a ship heading to Boston",
//   },
//   {
//     author: "Anonymous",
//     commend: "Expect nothing and you will never be dissapointed",
//   },
//   {
//     author: "Conor Mc Gregor",
//     commend: "They dont talk like a talk, they dont hit like i hit",
//   },
//   {
//     author: "Pop Smoke",
//     commend: "What you know bout love, i got all you need",
//   },
// ];

let comments = [
  {
    id: uuid(),
    comment: "Zosto ne sakas?",
    username: "Filip",
  },
  {
    id: uuid(),
    comment: "Појма немам?",
    username: "Lap Topot",
  },
  {
    id: uuid(),
    comment: "Uzivaj doznav zosto, deka sum vudichok",
    username: "Filip",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { comment, username } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const id = req.params.id;
  const newComment = req.body.comment;
  const comment = comments.find((c) => c.id === id);
  comment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Here are your ${qty} ${meat} takosi`);
});

app.use((req, res) => {
  res.send("Page not found");
});

app.listen(3000, () => {
  console.log("Server is live");
});
