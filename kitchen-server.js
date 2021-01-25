const { json, response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT;
const DataStore = require("nedb");
const cors = require("cors");
app.use(express.json());
app.listen();
app.listen(port, () => {});
app.use(cors());
const dishesList = new DataStore("dishesList.db");
const ordersList = new DataStore("ordersList.db");
dishesList.loadDatabase();
ordersList.loadDatabase();

app.use(express.static("public"));

app.get("/menu", (req, res) => {
  dishesList.find({}, (err, data) => {
    res.json(JSON.stringify(data));
  });
});
app.get("/orders", (req, res) => {
  ordersList.find({}, (err, data) => {
    res.json(JSON.stringify(data));
  });
});
app.post("/send-order", (req, res) => {
  let current = new Date();
  let currentTime = "";
  currentTime += current.getHours() + 1;
  currentTime += ":";
  console.log(current.getMinutes());
  if (current.getMinutes() > 9) {
    currentTime += current.getMinutes();
  } else {
    currentTime += "0" + current.getMinutes();
  }
  new order(req.body, currentTime);

  res.sendStatus(200);
});
app.post("/delete-order", (req, res) => {
  let idOfOrder = req.body.id;
  ordersList.remove({ _id: idOfOrder });
  res.redirect(req.get("referer"));
});

class order {
  constructor(orderedDishesList, orderTime) {
    this.orderedDishesList = orderedDishesList;
    this.orderTime = orderTime;
    ordersList.insert(this);
  }
}

class dish {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
    dishesList.insert(this);
  }
}
