import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Coin from "./routes/Coin";
import Home from "./routes/Home";
import CoinDetail from "./routes/CoinDetail";
import CoinPrice from "./routes/CoinPrice";
import Chart from "./routes/Chart";

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
    children: [
      {
        path: "price",
        element: <CoinPrice />,
      },
      {
        path: "chart",
        element: <Chart />,
      },
    ],
  },
]);

export default router;
