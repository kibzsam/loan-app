import { gql } from "@apollo/client";
export const LOANS_PRODUCTS = gql`
  query {
    loanProducts {
      id
      name
      interestRate
      maximumAmount
    }
  }
`;
