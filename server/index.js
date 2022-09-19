const { Router } = require("express");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const FoodModel = require("./Models/Food");

app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://jseiglie:zyUasFGpbo0sX75J@crud.zap8mps.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const { foodName, daysSinceIEat } = req.body;
  const food = new FoodModel({
    foodName: foodName,
    daysSinceIEat: daysSinceIEat,
  });

  try {
    food.save();
  } catch (error) {
    console.log(error);
  }
  res.send("inserted data");
});

app.get("/read", async (req, res) => {
  //FoodModel.find({ $where: {foodName: "apple"}})
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const { id, newFoodName } = req.body;
  try {
    await FoodModel.findByIdAndUpdate(id, { foodName: newFoodName }).exec();
    res.send("updated");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndDelete(id).exec();
});

app.listen(3001, () => {
  console.log("server up on 3001");
});
