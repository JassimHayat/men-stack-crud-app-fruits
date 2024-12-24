require("dotenv").config();
require("./config/database");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
//------------------------Models-------------------------------------
const Fruit = require("./models/fruit.js");
const app = express();
//----------------------MIDDLEWARE-------------------------------------
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // we need to ad this to use the boolean things
//------------------ROUTES-----------------------------------------
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});
app.get("/fruits/:fruitId", async (req, res) => {
  const fruitId = req.params.fruitId;
  const fruit = await Fruit.findById(fruitId);
  res.render("fruits/show.ejs", { fruit: fruit });
});

app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  });
});


app.delete("/fruits/:fruitId", async (req, res) => {
  const fruitId = req.params.fruitId;
  await Fruit.findByIdAndDelete(fruitId);
});

//POST- it will create/add the fruites /fruits
//Redirect you add the /, the render dont add the slash at the begining
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});
// GET /fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits });
});
// POST /fruits
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});











