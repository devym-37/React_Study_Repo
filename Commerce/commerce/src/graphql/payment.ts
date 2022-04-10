import { gql } from "graphql-tag";

export const EXECUTE_PAY = gql`
    type PayInfo {
        id: String!
        amount: Int!
    }

    mutation EXECUTE_PAY($info: PayInfo) {
        payInfo(info: $info)
    }
`;
