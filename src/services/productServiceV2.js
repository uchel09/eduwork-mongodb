import { ResponseError } from "../middlewares/responseError.js";
import productV2Model from "../models/productModel.js";
import { deleteImage } from "../utils/multer.js";


class ProductService {
  static async getAllProducts() {
    try {
      const products = await productV2Model.find();
      return products;
    } catch (error) {
      console.error("Error getting all products:", error.message);
      throw new ResponseError(500, "Failed to get products");
    }
  }

  static async getProductById(id) {
    try {
      const product = await productV2Model.findById(id);
      if (!product) {
        throw new ResponseError(404, "Product not found");
      }
      return product;
    } catch (error) {
      console.error("Error getting product by id:", error.message);
      throw new ResponseError(500, "Failed to get product");
    }
  }

  static async createProduct(product, imageUrl) {
    try {
      const image_url = `http://localhost:8000/public/${imageUrl}`;
      let { name, price, stock, status } = product;
      price = parseInt(price);
      stock = parseInt(stock);
      status = parseInt(status);

      const newProduct = new productV2Model({
        name,
        price,
        stock,
        status,
        image_url,
      });

      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error.message);
      throw new ResponseError(500, "Failed to create product");
    }
  }

  static async updateProduct(id, updateProduct, imageUrl) {
    try {
      const product = await productV2Model.findById(id);
      if (!product) {
        if (imageUrl) {
          deleteImage(imageUrl);
        }
        throw new ResponseError(404, "Product not found");
      }

      if (imageUrl) {
        deleteImage(product.image_url);
        product.image_url = imageUrl;
      }

      const { name, price, stock, status } = updateProduct;
      product.name = name;
      product.price = parseInt(price);
      product.stock = parseInt(stock);
      product.status = parseInt(status);

      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error.message);
      throw new ResponseError(500, "Failed to update product");
    }
  }

  static async deleteProduct(id) {
    try {
      const product = await productV2Model.findById(id);
      if (!product) {
        throw new ResponseError(404, "Product not found");
      }

      deleteImage(product.image_url);
      await productV2Model.deleteOne({ _id: id });
      return "Product deleted";
    } catch (error) {
      console.error("Error deleting product:", error.message);
      throw new ResponseError(500, "Failed to delete product");
    }
  }
}

export default ProductService;
