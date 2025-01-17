const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const asyncHandler = require('express-async-handler');

// Create a new product
exports.createProduct = asyncHandler (async (req, res) => {
    const { name, description, price } = req.body;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create product in DB
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl: result.secure_url,
    });

    res.status(201).json({
      status: 'success',
      data: {
        message: "Product added successfully",
        product,
      }
    });
});

// Retrieve all products
exports.getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
      status: 'success',
      data: {
        message: "Products fetched successfully",
        products,
      }
    });
});

// Update a product
exports.updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ 
        status: 'fail',
        data: {
            message: 'Product not found'
        } 
    });
    }

    // Update image if a new file is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      product.imageUrl = result.secure_url;
    }

    // Update other fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();

    res.status(200).json({
      status: 'success',
      data: {
        message: "Product updated successfully",
        product,
      }
    });
});

// Delete a product
exports.deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        data: {
            message: 'Product not found'
        }
        });
    }

    // delete image from Cloudinary
    const publicId = product.imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    await product.remove();

    res.status(204).json({
      status: 'success',
      data: {
        message: "Product deleted successfully",
      }
    });
});
