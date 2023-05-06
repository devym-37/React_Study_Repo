import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { CoinInfo, CoinPrice } from "../types";
import { useQuery } from "react-query";
import { fetchCoinDetail, fetchCoinPrice } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.textColor};
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: rgba(255, 255, 255, 1);
  }
`;

const Description = styled.div`
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 1);
  margin: 10px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : "white")};
  a {
    display: block;
  }
`;

const CoinDetail = () => {
  const { coinId } = useParams();
  const { state } = useLocation();

  const { isLoading: detailLoading, data: info } = useQuery(
    ["detail", coinId],
    () => fetchCoinDetail(coinId)
  );
  const { isLoading: priceLoading, data: price } = useQuery(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
  );

  const chartMatch = useMatch("coin/:coinId/chart");
  const priceMatch = useMatch("coin/:coinId/price");

  if ([info, price].every((data) => data === null)) return null;

  const loading = detailLoading || priceLoading;

  return (
    <Container>
      <Header>
        <Title>{loading ? "Loading..." : info?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
          </OverView>

          <Description>{info?.description}</Description>

          <OverView>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </OverView>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
};

export default CoinDetail;
