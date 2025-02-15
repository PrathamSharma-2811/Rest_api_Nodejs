const Product = require('../models/product');
const fs = require('fs');
const csv = require('csv-parser');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const newProduct = await product.save();
        res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products retrieved successfully', data: products });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product retrieved successfully', data: product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update product', error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete product', error: error.message });
    }
};



// bulk upload

const bulkUpload = async(req,res) =>{
 if(!req.file){
    return res.status(400).json({message:"Please upload a file"})
 }
 const results = [];
 const file = req.file;
 fs.createReadStream(file.path)
 .pipe(csv())
 .on('data',(data)=> results.push(data))
 .on('end',async()=>{
    try {
        await Product.insertMany(results);
        res.status(200).json({message:"Products uploaded successfully"});

    }catch(err){
        res.status(400).json({message:"Failed to upload products",error:err.message});
    } finally{
         fs.unlinkSync(file.path);
    }

 });

}
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    bulkUpload
};
