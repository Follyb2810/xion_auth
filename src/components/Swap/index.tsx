import type React from "react"

import {  useState } from "react"
import { Button } from "./../../components/ui/button"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "./../../components/ui/card"
import { Input } from "./../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./../../components/ui/select"
import { ArrowDown, ArrowLeft, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "../../hook/useToast"


export default function SwapToken() {

  const [isLoading, setIsLoading] = useState(false)
  const [fromToken, setFromToken] = useState("eth")
  const [toToken, setToToken] = useState("usdc")
  const  toast  = useToast()


  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.success(
         "Swap successful Your tokens have been swapped successfully.",
      )
    }, 2000)
  }



  return (
    <div className="container mx-auto max-w-md py-8">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Swap</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Swap Tokens</CardTitle>
          <CardDescription>Exchange one token for another</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSwap} className="space-y-6">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">From</span>
                  <span className="text-xs text-muted-foreground">Balance: 1.45 ETH</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    className="border-0 text-xl shadow-none focus-visible:ring-0"
                    required
                  />
                  <Select value={fromToken} onValueChange={setFromToken}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="btc">BTC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={handleSwapTokens}>
                  <ArrowDown className="h-4 w-4" />
                  <span className="sr-only">Swap tokens</span>
                </Button>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">To</span>
                  <span className="text-xs text-muted-foreground">Balance: 2,500 USDC</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    className="border-0 text-xl shadow-none focus-visible:ring-0"
                    disabled
                  />
                  <Select value={toToken} onValueChange={setToToken}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="btc">BTC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span>1 ETH = 2,145.78 USDC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span>0.3%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Slippage Tolerance</span>
                <span>0.5%</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Swapping...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Swap
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
