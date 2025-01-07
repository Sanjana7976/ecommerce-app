const Cart = require("../models/cartModel");
exports.addItemToCart = async (req, resp) => {
    try {
        const { name, description, slug, price, quantity, category } = req.body
        console.log(req.body)

        const cartitem = new Cart(req.body)

        await cartitem.save()
        resp.status(201).send({
            success: true,
            message: "cartitem created successfully",
            cartitem
        })
    } catch (error) {
        resp.status(500).send({
            success: false,
            error,
            message: "Error in creating cartitem"
        })
    }
}
exports.getCartitem = async (req, resp) => {
    try {
        const cartitem = await Cart.find({}).select("-photo").limit(10).sort({ createdAt: -1 }).populate("category")
        resp.status(200).send({
            success: true,
            total: cartitem.length,
            message: "All Products",
            cartitem,

        })
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message
        })
    }
}
exports.deleteCartitem = async (req, resp) => {
    try {
        await Cart.findByIdAndDelete(req.params.pid).select("-photo")
        resp.status(200).send({
            success: true,
            message: "Cart item deleted successfully",
        })
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error deleting Cartitem",
            error
        })
    }
}

