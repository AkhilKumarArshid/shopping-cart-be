const fs = require("fs");
const router = require("express").Router();
const dataPath = "./src/json/products.json";

router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    let databases = JSON.parse(data);
    res.status(200).json(databases);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
});

router.post("/", (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    let productsList = JSON.parse(data);
    let cartItems = req.body;
    for(let i=0; i<cartItems.length; i++) {
      productsList.map((item) => {
        if(cartItems[i].name === item.name && cartItems[i].checked === true){
          item.quantity = item.quantity - cartItems[i].selected;
      }
    })
    }
    fs.writeFile(dataPath, JSON.stringify(productsList, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });
    res.send(productsList);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
});

module.exports = router;
