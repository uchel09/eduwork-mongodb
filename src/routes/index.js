
import { productRouter } from "./productRoute.js";

const allRoutes = (app) => {

  app.use("/api/v1/products", productRouter);
};

export default allRoutes;
