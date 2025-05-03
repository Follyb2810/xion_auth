import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "../../hook/useToast";
import { useAuth } from "@/context/useAuth";
import useXion from "@/hook/useXion";
import { useAssets } from "@/hook/useAssets";
import useMeta from "@/hook/useMeta";
import { Coin } from '@cosmjs/stargate';
import { xionToUxion } from "@/helper/convert";

export default function SendToken() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { transferTokens , getMetaBalance} = useXion();  
  const toast = useToast();
  const { assets } = useAssets();
  const { bech32Address, isConnected, openWalletModal } = useMeta();

  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [availableBalance, setAvailableBalance] = useState<string>("0");

  const [formData, setFormData] = useState({
    receiverAddress: "",
    amount: "0",  
    note: "",
  });

  const { receiverAddress, amount, note } = formData;

  useEffect(() => {
    if (selectedAsset && assets.length > 0) {
      const asset = assets.find((a) => a.denom === selectedAsset);
      if (asset) {
        setAvailableBalance(asset.amount);
      } else {
        setAvailableBalance("0");
      }
    }
  }, [selectedAsset, assets]);
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value : value, 
    }));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (!user?.walletAddress) return;
  
      if (!isConnected) {
        openWalletModal(); 
        setIsLoading(false);
        return;
      }
  
      if (!receiverAddress || !amount || !selectedAsset) {
        toast.error("Recipient address, asset, and amount are required.");
        return;
      }
  
      if (parseFloat(amount) > parseFloat(availableBalance)) {
        toast.error(`You cannot send more than your balance (${availableBalance} ${selectedAsset}).`);
        return;
      }
  
      const balance = await getMetaBalance(bech32Address);
      console.log("Balance:", balance);
  
      const formatedAmount = xionToUxion(amount);
      const amounts: Coin[] = [{ denom: selectedAsset, amount: formatedAmount }];
      const memo = note || "Token transfer";
  
      const txHash = await transferTokens(receiverAddress, amounts, memo);
      console.log('Transfer successful, tx hash:', txHash);
  
      toast.success(`Transfer successful! Tx Hash: ${txHash}`);
  
      setFormData({ receiverAddress: "", amount: "0", note: "" });
      setSelectedAsset("");
  
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Failed to send transaction.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Send Assets</CardTitle>
          <CardDescription>Send crypto to any wallet address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="asset">Asset</Label>
                <Select onValueChange={setSelectedAsset} value={selectedAsset}>
                  <SelectTrigger id="asset">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset, index) => (
                      <SelectItem key={`${index}-${asset.denom}`} value={asset.denom}>
                        {asset.denom} ({asset.amount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  name="receiverAddress"
                  placeholder="0x..."
                  required
                  value={receiverAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="amount">Amount</Label>
                  <span className="text-xs text-muted-foreground">
                    Balance: {availableBalance ?? "0.0"} {selectedAsset}
                  </span>
                </div>
                <Input
                  id="amount"
                  type="number"
                  name="amount"
                  step="0.0001"
                  min="0"
                  placeholder="0.0"
                  required
                  value={amount}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input
                  id="note"
                  name="note"
                  placeholder="Add a note to this transaction"
                  value={note}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Transaction
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
