import productService from "../services/productService.js";

class ProductController {
  static getAll(req, res, next) {
    productService
      .getAllProducts()
      .then((products) => {
        res.status(200).json({
          dataLength: products.length,
          status: "success",
          data: products,
        });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }

  static getById(req, res) {
    productService
      .getProductById(req.params.id)
      .then((product) => {
        res.status(200).json({
          status: "success",
          data: product,
        });
      })
      .catch((error) => {
        next(error);
      });
  }

  static create(req, res, next) {
    const imageUrl = req.file ? req.file.filename : null;

    productService
      .createProduct(req.body, imageUrl)
      .then((product) => {
        res.status(201).json({
          status: "success",
          data: product.insertedId,
        });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }

  static update(req, res, next) {
    const imageUrl = req.file ? req.file.filename : null;
    const newImagePath = imageUrl
      ? `http://localhost:8000/public/${imageUrl}`
      : null;

    productService
      .updateProduct(req.params.id, req.body, newImagePath)
      .then((result) => {
        res.status(200).json({ message: "Product updated successfully" });
      })
      .catch((error) => {
        next(error);
      });
  }

  static delete(req, res,next) {
    productService
      .deleteProduct(req.params.id)
      .then((message) => {
        res.status(200).json({ message });
      })
      .catch((error) => {c
        next(error);
      });
  }
}

export default ProductController;
