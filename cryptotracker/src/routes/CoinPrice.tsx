import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";

import { fetchCoinChart } from "../api";
import { CoinChartData, ContextTypes } from "../types";

const CoinPrice = () => {
  const { coinId } = useOutletContext<ContextTypes>();

  const { isLoading, data } = useQuery<CoinChartData[]>(
    ["coinChart", coinId],
    () => fetchCoinChart(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "loading chart..."
      ) : (
        <div>
          <ApexChart
            type="candlestick"
            series={[
              {
                data:
                  data?.map((price) => {
                    return {
                      x: new Date(price.time_close),
                      y: [price.open, price.high, price.low, price.close],
                    };
                  }) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                type: "candlestick",
                height: 350,
                background: "transparent",
                toolbar: {
                  show: false,
                },
              },
              title: {
                text: "CandleStick Chart",
                align: "left",
              },
              xaxis: {
                type: "datetime",
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CoinPrice;
