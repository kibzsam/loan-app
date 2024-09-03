import { gql } from "@apollo/client";
export const LOANS_PRODUCTS = gql`
  query LoanProducts {
    loanProducts {
      id
      name
      interestRate
      maximumAmount
    }
  }
`;
