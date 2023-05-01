import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Coin from "./routes/Coin";
import Home from "./routes/Home";
import CoinDetail from "./routes/CoinDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/coin",
    element: <Coin />,
  },
  {
    path: "/coin/:coinId",
    element: <CoinDetail />,
  },
]);

export default router;
