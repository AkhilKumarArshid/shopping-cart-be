//Import modules

const express = require("express");
const app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 8080;

//routes file import
const productsRouter = require("./src/routes/products.js");

app.use("/api/products",productsRouter);

app.listen(port, () => {
  console.log(`Backend App listening on port ${port}`);
})