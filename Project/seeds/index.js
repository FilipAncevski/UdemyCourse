const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { descriptors, places } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const randomHelper = (array) => array[Math.floor(Math.random() * array.length)];

const DB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const price = Math.floor(Math.random() * 25 + 10);
    const random = Math.floor(Math.random() * 1000);
    const newCamp = new Campground({
      location: `${cities[random].city}, ${cities[random].state}`,
      title: `${randomHelper(places)} ${randomHelper(descriptors)}`,
      image: `https://source.unsplash.com/collection/483251`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis corrupti, magnam non nostrum debitis ea velit quis ex cumque voluptates animi quibusdam aut est eum asperiores ipsum eveniet? Eveniet, provident.",
      price,
    });
    await newCamp.save();
  }
};

DB().then(() => {
  db.close();
});
