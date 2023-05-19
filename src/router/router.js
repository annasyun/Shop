import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import AllProducts from "../pages/AllProducts";
import ProductDetail from "../pages/ProductDetail";
import NewProduct from "../pages/NewProduct";
import Cart from "../pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AllProducts /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "products/new", element: <NewProduct /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

export default router;
