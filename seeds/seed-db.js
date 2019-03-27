const db = require("../models");
const items = [
  {
    product_name: "Buggati Divo",
    department_name: "Luxury",
    price: 59.99,
    stock_quantity: 40
  },
  {
    product_name: "McLaren 600lt",
    department_name: "Luxury",
    price: 49.99,
    stock_quantity: 45
  },
  {
    product_name: "Mercedes - Maybach 6 Cabriolet",
    department_name: "Luxury",
    price: 44.99,
    stock_quantity: 16
  },
  {
    product_name: "Lamborghini Urus",
    department_name: "Luxury",
    price: 59.99,
    stock_quantity: 75
  },
  {
    product_name: "Koenigsegg Agera Rs",
    department_name: "Luxury",
    price: 39.99,
    stock_quantity: 8
  },
  {
    product_name: "Pagani Huayra",
    department_name: "Luxury",
    price: 68.95,
    stock_quantity: 60
  },
  {
    product_name: "Mazzanti Evantra",
    department_name: "Luxury",
    price: 59.99,
    stock_quantity: 125
  },
  {
    product_name: "Aston Martin Vantage",
    department_name: "Luxury",
    price: 43.99,
    stock_quantity: 30
  },
  {
    product_name: "Rolls-Royce Sweptail",
    department_name: "Luxury",
    price: 89.71,
    stock_quantity: 32
  },
  {
    product_name: "Tesla Model X",
    department_name: "Luxury",
    price: 77.61,
    stock_quantity: 8
  }
];

db.sequelize.sync({ force: true }).then(function() {
  db.Product.bulkCreate(items)
    .then(function(rows) {
      console.log("/n/nINSERTED/n/n");
    })
    .catch(function(err) {
      console.log("/n/nError:", err);
    });
});
