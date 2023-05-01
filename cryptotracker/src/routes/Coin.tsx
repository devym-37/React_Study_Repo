import { useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Coin = () => {
  const { coinId } = useParams() as {
    coinId: string;
  };

  return <Title>Coin</Title>;
};

export default Coin;
