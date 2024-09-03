import { API_URL } from "@/api/common/CONSTANTS";
import { gql } from "@apollo/client";
import axios from "axios";
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

type LoanData = {
  data?: {
    full_name: string;
    email: string;
    loan_amount: number;
    loan_purpose: string;
  };
};
export const applyLoan = async ({ data }: LoanData) => {
  try {
    // sourcery skip: inline-immediately-returned-variable
    const response = await axios.post(`${API_URL}/apply-loan`, data, {
      headers: { "content-type": "application/json" },
    });
    return response;
  } catch (e: any) {
    return e;
  }
};
