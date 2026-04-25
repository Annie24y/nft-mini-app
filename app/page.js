"use client";

import { useState } from "react";
import { contract } from "../lib/contract";
import { inAppWallet } from "thirdweb/wallets";
import { claimTo } from "thirdweb/extensions/erc1155";

const wallet = inAppWallet();

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function claimNFT() {
    try {
      setLoading(true);
      setStatus("");

      const account = await wallet.connect();

      await claimTo({
        contract,
        to: account.address,
        tokenId: 0,
        quantity: 1,
      });

      setStatus("✅ NFT Claimed!");
    } catch (e) {
      setStatus("❌ Failed or sold out");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Claim Your NFT</h1>

      <button onClick={claimNFT} disabled={loading}>
        {loading ? "Claiming..." : "Claim NFT"}
      </button>

      <p>{status}</p>
    </main>
  );
}
