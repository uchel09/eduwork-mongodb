import { ResponseError } from "../middlewares/responseError.js";
import { db } from "../config/database.js";
import { deleteImage } from "../utils/multer.js";
import { ObjectId } from "mongodb";

class ProductService {
  static getAllProducts() {
    return db.collection("products").find().toArray();
  }

  static getProductById(id) {
    return db.collection("products").findOne({ _id: new ObjectId(id) });
  }

  static createProduct(product, imageUrl) {
    const image_url = `http://locaLhost:8000/public/${imageUrl}`;
    let { name, price, stock, status } = product;
    price = parseInt(price);
    stock = parseInt(stock);
    status = parseInt(status);
    return db.collection("products").insertOne({
      name,
      price,
      stock,
      status,
      image_url,
    });
  }

  static updateProduct(id, updateProduct, imageUrl) {
    return db
      .collection("products")
      .findOne({ _id: new ObjectId(id) })
      .then((product) => {
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

        return db
          .collection("products")
          .updateOne({ _id: new ObjectId(id) }, { $set: product });
      })
      .then((result) => {
        if (result.modifiedCount === 0) {
          throw new ResponseError(500, "Failed to update product");
        }
        return result;
      })
      .catch((error) => {
        console.error("Error updating product:", error.message);
        throw new ResponseError(500, error.message);
      });
  }

  static deleteProduct(id) {
    return db
      .collection("products")
      .findOne({ _id: new ObjectId(id) })
      .then((product) => {
        if (!product) {
          return Promise.reject(new ResponseError(404, "Product not found"));
        }
        deleteImage(product.image_url);
        return db
          .collection("products")
          .deleteOne({ _id: new ObjectId(id) })
          .then(() => "Product deleted");
      })
      .catch((error) => {
        console.error("Error deleting product:", error.message);
        return Promise.reject(
          new ResponseError(500, "Failed to delete product")
        );
      });
  }
}

export default ProductService;
