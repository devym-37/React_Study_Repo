import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

const CoinDetail = () => {
  const { coinId } = useParams() as { coinId: string };
  console.log("coinId :>> ", coinId);
  return <h1>{coinId}</h1>;
};

export default CoinDetail;
