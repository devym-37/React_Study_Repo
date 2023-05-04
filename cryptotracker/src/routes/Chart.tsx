import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Chart = () => {
  return <Title>Chart</Title>;
};

export default Chart;
