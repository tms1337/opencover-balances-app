require("dotenv").config();

const {
  ALCHEMY_API_KEY,
  USDC_CONTRACT_ADDRESS,
  BANK_API_URL,
  ALCHEMY_API_URL,
} = process.env;

export const config = {
  bankApiBaseURL: BANK_API_URL,
  alchemyApiBaseURL: ALCHEMY_API_URL,
  usdcContractAddress: USDC_CONTRACT_ADDRESS,
  security: {
    alchemyKey: ALCHEMY_API_KEY,
  },
};
