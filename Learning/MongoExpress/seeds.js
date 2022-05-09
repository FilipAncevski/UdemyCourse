const mongoose = require("mongoose");

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

const p = new Product({
  name: "Grapefruit",
  price: 1.99,
  catergory: "fruit",
});

// p.save()
//   .then((p) => console.log(p))
//   .catch((err) => console.log(err));

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    catergory: "vegetable",
  },
  {
    name: "Organic Goddes Melon",
    price: 4.99,
    catergory: "fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    catergory: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    catergory: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    catergory: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
