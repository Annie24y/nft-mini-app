"use client";

import { useState } from "react";
import { contract } from "../lib/contract";
import { inAppWallet } from "thirdweb/wallets";
import { claim } from "thirdweb/extensions/erc1155";

const wallet = inAppWallet();

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function claimNFT() {
    try {
      setLoading(true);
      setStatus("");

      const account = await wallet.connect();

      await claim({
        contract,
        to: account.address,
        tokenId: 0,
        quantity: 1,
      });

      setStatus("✅ NFT Claimed Successfully!");
    } catch (e) {
      console.log("ERROR:", e);

      // Better UX error message (shows real reason if available)
      setStatus(e?.message || "❌ Transaction failed (check claim conditions or supply)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🎁 Claim Your NFT</h1>

      <p>Base Eternal - Early Builder</p>

      <button
        onClick={claimNFT}
        disabled={loading}
        style={{
          padding: "12px 20px",
          marginTop: 20,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        {loading ? "Claiming..." : "Claim NFT"}
      </button>

      <p style={{ marginTop: 20 }}>{status}</p>
    </main>
  );
}
