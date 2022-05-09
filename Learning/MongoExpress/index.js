const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => {
    console.log("Ups coundlt connect");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const catergories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res) => {
  const { catergory } = req.query;
  if (catergory) {
    const products = await Product.find({ catergory });
    res.render("products/index", { products, catergory });
  } else {
    const products = await Product.find();
    res.render("products/index", { products, catergory: "All" });
  }
});

app.get("/products/new", async (req, res) => {
  const products = await Product.find();
  res.render("products/new", { products });
});

app.get("/products/:id/edit", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/edit", { product, catergories });
});

app.post("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/show", { product });
});

app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
