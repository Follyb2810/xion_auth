// import { useAuth } from "@/context/useAuth";
import useMeta from "@/hook/useMeta";
import { uxionToXion } from "@/helper/convert";
import { Coin } from "@cosmjs/stargate";
import { useState } from "react";

export default function useXion() {
  const {
    bech32Address,
    isConnected,
    queryClient,
    signingClient,
    signArb,
  } = useMeta();
  // const { user } = useAuth();
  const [signArbResponse, setSignArbResponse] = useState<string>("");

  const handleSign = async (): Promise<void> => {
    if (!signingClient?.granteeAddress) {
      console.error("No grantee address to sign with.");
      return;
    }

    try {
      const response = await signArb?.(
        signingClient.granteeAddress,
        "abstraxion challenge"
      );
      if (response) setSignArbResponse(response);
      console.log("Signature response:", response);
    } catch (error) {
      console.error("Error in handleSign:", error);
    }
  };

  const transferTokens = async (
    recipientAddress: string,
    amount: Coin[],
    memo = ""
  ): Promise<string> => {
    if (!isConnected || !signingClient || !bech32Address) {
      throw new Error("Wallet not properly connected.");
    }

    try {
      return await attemptTransfer(recipientAddress, amount, memo);
    } catch (err: unknown) {
      console.error("Transfer failed:", err);
      throw err;
    }
  };

  const attemptTransfer = async (
    to: string,
    amount: Coin[],
    memo = ""
  ): Promise<string> => {
    console.log({bech32Address,
      to,
      amount,
      memo},'attemp transfer')
    const result = await signingClient!.sendTokens(
      bech32Address!,
      to,
      amount,
      "auto",
      memo
    );
    if (result.code !== 0) {
      throw new Error(`Token transfer failed: ${result.transactionHash}`);
    }
    return result.transactionHash;
  };

  const getMetaBalance = async (address: string, denom = "uxion") => {
    if (!queryClient) throw new Error("Query client is not initialized.");
    try {
      const balance = await queryClient.getBalance(address, denom);
      // console.log({balance},'from get mata balance')
      return balance?.amount ? uxionToXion(balance.amount) : "0";
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      return "0";
    }
  };

  const getWalletQuery = async () => {
    if (!queryClient) throw new Error("Query client is not initialized.");
    try {
      const res = await queryClient.queryContractSmart("", { get_count: {} });
      console.log("Contract query result:", res);
      return res;
    } catch (err) {
      console.error("Smart contract query failed:", err);
      throw err;
    }
  };

  return {
    handleSign,
    transferTokens,
    getMetaBalance,
    getWalletQuery,
    signArbResponse,
  };
}
