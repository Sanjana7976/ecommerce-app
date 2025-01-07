const productModel = require("../models/productModel")
const slugify = require('slugify')
const fs = require('fs')

const createProductController = async (req, resp) => {
    try {

        const { name, description, price, quantity, category } = req.fields
        const { photo } = req.files
        switch (true) {
            case !name:
                return resp.status(500).send({ error: "Name is required" })
            case !description:
                return resp.status(500).send({ error: "Description is required" })
            case !price:
                return resp.status(500).send({ error: "Price is required" })
            case !quantity:
                return resp.status(500).send({ error: "Quantity is required" })
            case !category:
                return resp.status(500).send({ error: "Category is required" })
            case !photo && photo.size > 1000000:
                return resp.status(500).send({ error: "Photo is required and should be less than 1Mb" })
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        resp.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })

    } catch (error) {
        resp.status(500).send({
            success: false,
            error,
            message: "Error in creating product"
        })
    }
}

const getProductsController = async (req, resp) => {
    try {
        const product = await productModel.find({}).select("-photo").limit(10).sort({ createdAt: -1 }).populate("category")
        resp.status(200).send({
            success: true,
            total: product.length,
            message: "All Products",
            product,

        })

    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message
        })
    }
}

const getSingleProductController = async (req, resp) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        resp.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product
        })
        
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error getting single product",
            error
        })
    }
}

const getProductphotoController = async (req, resp) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            resp.set('Content-type', product.photo.contentType)
            return resp.status(200).send(product.photo.data)
        }
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error getting Product Photo",
            error
        })
    }
}

const productDeleteController = async (req, resp) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        resp.status(200).send({
            success: true,
            message: "Product deleted successfully",
        })
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error deleting Product",
            error
        })
    }
}

const updateProductController = async (req, resp) => {
    try {
        const { name, description, slug, price, quantity, category } = req.fields
        const { photo } = req.files
        switch (true) {
            case !name:
                return resp.status(500).send({ error: "Name is required" })
            case !description:
                return resp.status(500).send({ error: "Description is required" })
            case !price:
                return resp.status(500).send({ error: "Price is required" })
            case !quantity:
                return resp.status(500).send({ error: "Quantity is required" })
            case !category:
                return resp.status(500).send({ error: "Category is required" })
            case !photo && photo.size > 1000000:
                return resp.status(500).send({ error: "Photo is required and should be less than 1Mb" })
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        resp.status(201).send({
            success: true,
            message: "Product updated successfully",
            product
        })


    } catch (error) {
        resp.status(500).send({
            success: false,
            error,
            message: "Error in updating product"
        })
    }
}

const filterProductController = async (req, resp) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        resp.status(200).send({
            success: true,
            products,
        })

    } catch (error) {
        resp.status(400).send({
            success: false,
            message: "Error in filtering product",
            error,
        })
    }
}

const searchProductController = async (req, resp) => {
    try {

        const result = await productModel.find({
            $or: [
                { name: { $regex: req.params.key } },
                { description: { $regex: req.params.key } }
            ]
        }).select("-photo")
        resp.json(result)
    }
    catch (error) {
        resp.status(400).send({
            success: false,
            message: "Error in Searching product",
            error,
        })
    }
}

module.exports = { createProductController, getProductsController, getProductphotoController, getSingleProductController, searchProductController, filterProductController, updateProductController, productDeleteController }