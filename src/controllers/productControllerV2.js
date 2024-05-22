import ProductService from "../services/productService.js";

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({
        resultLength: products.length,
        status: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.status(200).json({
        status: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const imageUrl = req.file ? req.file.filename : null;
      const product = await ProductService.createProduct(req.body, imageUrl);
      res.status(201).json({
        status: true,
        _id: product.insertedId,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateProduct = req.body;
      const imageUrl = req.file ? req.file.filename : null; 
      const updatedProduct = await ProductService.updateProduct(
        id,
        updateProduct,
        imageUrl
      );
      res.status(200).json({
        status:true,
        message:"update success"
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
