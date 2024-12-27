import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/productModel.js";
import logger from "../config/logger.js"; 

const addProduct = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            quantity,
            brand } = req.fields

        console.log(
            name,
            description,
            price,
            category,
            quantity,
            brand) // TEST

        // switch statement
        switch (true) {
            case !name:
                return res.json({
                    error: "Name is required"
                })
            case !description:
                return res.json({
                    error: "Description is required"
                })
            case !price:
                return res.json({
                    error: "Price is required"
                })
            case !category:
                return res.json({
                    error: "Category is required"
                })
            case !quantity:
                return res.json({
                    error: "Quantity is required"
                })
            case !brand:
                return res.json({
                    error: "Brand is required"
                })
        }

        const product = new Product({ ...req.fields })
        await product.save()
        res.json(product)
        logger.info(product)

    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
        logger.error(error)
    }
})

const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            quantity,
            brand } = req.fields

        switch (true) {
            case !name:
                return res.json({
                    error: "Name is required"
                })
            case !description:
                return res.json({
                    error: "Description is required"
                })
            case !price:
                return res.json({
                    error: "Price is required"
                })
            case !category:
                return res.json({
                    error: "Category is required"
                })
            case !quantity:
                return res.json({
                    error: "Quantity is required"
                })
            case !brand:
                return res.json({
                    error: "Brand is required"
                })
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.fields },
            { new: true })

        await product.save()
        res.json(product)
        logger.info(product)

    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
        logger.error(error.message)
    }
})

const removeProducts = asyncHandler(async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(product)
        logger.info(product)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
        logger.error(error.message)
    }
})

const fetchProducts = asyncHandler(async (req, res) => {
    try {

        const pageSize = 6
        const keyword = req.query.keyword
            ? { name: { $regex: req.query.keyword, $options: "i" } }
            : {}

        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }).limit(pageSize)

        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
})

const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            return res.json(product)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    } catch (error) {
        console.log(error)
        res.status(404).json(error.message)
    }
})

const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({ createdAt: -1 });
        res.json(products)
    } catch (error) {
        console.log(error)
    }

})

const addProductReview = asyncHandler(async (req, res) => {
    try {

        const { rating, comment } = req.body
        const product = await Product.findById(req.params.id)
        if (product) {
            const alreadyReviewed = product.reviews.find(r => r.user.toString() == req.user._id.toString())

            if (alreadyReviewed) {
                res.status(400)
                throw new Error('Product already reviewed')
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save()
            res.status(201).json({ message: 'Review added' })
            logger.info(product)
        } else {
            res.status(404)
            logger.error(req.user.username + ": " + error.message)
            throw new Error('Product not found')
        }


    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
        logger.error(error.message)
    }
})

const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 }).limit(5);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const filterProducts = asyncHandler(async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}


        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await Product.find(args)
        res.json(products)

    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }
})

export {
    addProduct,
    updateProductDetails,
    removeProducts,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
}