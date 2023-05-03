import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Home = () => {
  return (
    <Container>
      <Link to="/coin">
        <Title>Go To CoinList</Title>
      </Link>
    </Container>
  );
};

export default Home;
