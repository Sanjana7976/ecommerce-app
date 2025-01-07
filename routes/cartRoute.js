const express = require("express");
const {addItemToCart,getCartitem, deleteCartitem} = require("../controllers/cartController");

const router = express.Router();

router.post("/addtocart/:id", addItemToCart);
router.get("/getcart", getCartitem);
router.delete("/deletecart/:pid", deleteCartitem);


module.exports = router;
