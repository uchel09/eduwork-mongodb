
import { productRouter } from "./productRoute.js";
import { productV2Router } from "./productRouterV2.js";

const allRoutes = (app) => {

  app.use("/api/v1/products", productRouter);
  app.use("/api/v2/products", productV2Router);
};

export default allRoutes;
