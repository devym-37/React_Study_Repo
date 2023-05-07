import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { CoinChartData, ContextTypes } from "../types";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinChart } from "../api";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Chart = () => {
  const isDark = useRecoilValue(isDarkAtom);

  const { coinId } = useOutletContext<ContextTypes>();

  const { isLoading, data } = useQuery<CoinChartData[]>(
    ["coinChart", coinId],
    () => fetchCoinChart(coinId),
    {
      refetchInterval: 10000,
    }
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
                name: `${coinId}`,
                data: data?.map((price) => price.close) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
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
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              yaxis: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#0be881"],
                  stops: [0, 100],
                },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Chart;
