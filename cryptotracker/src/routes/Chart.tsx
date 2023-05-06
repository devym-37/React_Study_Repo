import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { CoinChartData, ContextTypes } from "../types";
import { useQuery } from "react-query";
import { fetchCoinChart } from "../api";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Chart = () => {
  const { coinId } = useOutletContext<ContextTypes>();

  const { isLoading, data } = useQuery<CoinChartData[]>(
    ["coinChart", coinId],
    () => fetchCoinChart(coinId)
  );

  console.log("coinId :>> ", data);
  return <Title>Chart</Title>;
};

export default Chart;
