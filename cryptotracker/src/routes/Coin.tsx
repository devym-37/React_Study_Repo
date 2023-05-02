import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinInterface } from "../types";
import { useEffect, useState } from "react";

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

const CoinList = styled.ul``;

const CoinItem = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coin = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();

      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <CoinItem key={coin.id}>
              <Link
                to={{
                  pathname: `/coin/${coin.id}`,
                }}
                state={{ name: coin.name }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </CoinItem>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coin;
