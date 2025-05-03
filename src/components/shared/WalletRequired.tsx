import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { WalletConnect } from "./wallet-connect";

export default function WalletRequired() {
  return (
    <div className="flex h-full items-center justify-center">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Wallet Required</CardTitle>
        <CardDescription>Please connect your wallet to access this page.</CardDescription>
      </CardHeader>
      <CardFooter>
        <WalletConnect asButton />
      </CardFooter>
    </Card>
  </div>
  )
}
