import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

const Coin = () => {
  const { coinId } = useParams() as {
    coinId: string;
  };

  return <h1>Coin</h1>;
};

export default Coin;
