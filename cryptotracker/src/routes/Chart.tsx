import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { CoinChartData, ContextTypes } from "../types";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
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
  return (
    <div>
      {isLoading ? (
        "loading chart..."
      ) : (
        <div>
          <Title>Chart</Title>
          <ApexChart
            type="line"
            series={[
              {
                data: data?.map((price) => price.close) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
              yaxis: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Chart;
