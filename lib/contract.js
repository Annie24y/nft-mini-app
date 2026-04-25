import { getContract } from "thirdweb";
import { client } from "./thirdweb";

export const contract = getContract({
  client,
  chain: {
    id: 8453,
    rpc: "https://mainnet.base.org",
  },
  address: "0x95Bf43691A2244A79Ae6c5b661B055e61d529354",
});
