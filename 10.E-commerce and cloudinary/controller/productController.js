import HttpError from "../middleware/HttpError.js";
import Product from "../model/productModel.js";
import cloudinary from "../config/cloudinary.js";

const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category } = req.body

        if (!req.file) {
            return next(new HttpError("Image is required", 400));
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image: req.file.path,
            cloudinary_id: req.file.filename
        })

        await newProduct.save()

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            product: newProduct
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({ message: "Get all Product Successfully......!", products });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const getProductById = async (req, res, next) => {
    try {

        const id = req.params.id

        const product = await Product.findById(id);

        if (!product) {
            return next(new HttpError("Product not found", 404));
        }

        res.status(200).json({ message: "get Product Successfully..!", product });

    } catch (error) {
        next(new HttpError("Invalid Product ID", 400));
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return next(new HttpError("Product not found", 404));
        }

        await cloudinary.uploader.destroy(product.cloudinary_id)

        res.status(200).json({ message: "Product Delete Successfully..!", product });

      await  product.deleteOne()
    } catch (error) {
        next(new HttpError("Invalid Product ID", 400));
    }
}

export default { createProduct, getAllProducts, getProductById,deleteProduct}