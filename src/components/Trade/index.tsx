import type React from "react"
import {  useState } from "react"
import { Button } from "./../../components/ui/button"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "./../../components/ui/card"
import { Input } from "./../../components/ui/input"
import { Label } from "./../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./../../components/ui/tabs"
import { ArrowDown, ArrowLeft, ArrowUp, LineChart } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "../../hook/useToast"


export default function TradeToken() {
  const [isLoading, setIsLoading] = useState(false)
  const  toast  = useToast()


  const handleTrade = (e: React.FormEvent, type: "buy" | "sell") => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false)
      toast.success(
         `Order ${type === "buy" ? "placed" : "sold"} Your ${type} order has been submitted successfully.`,
      )
    }, 2000)
  }

  

  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Trade</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5" />
              ETH/USD Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-md border bg-muted/50 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization would appear here</p>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-medium">$2,145.78</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">24h Change</div>
                <div className="font-medium text-green-500">+5.67%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">24h High</div>
                <div className="font-medium">$2,189.45</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">24h Low</div>
                <div className="font-medium">$2,022.31</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trade ETH</CardTitle>
            <CardDescription>Buy or sell Ethereum</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buy">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>

              <TabsContent value="buy">
                <form onSubmit={(e) => handleTrade(e, "buy")} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="buy-amount">Amount (ETH)</Label>
                    <Input id="buy-amount" type="number" step="0.01" min="0.01" placeholder="0.00" required />
                    <div className="text-xs text-muted-foreground">Available: $10,000.00 USD</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buy-price">Price (USD)</Label>
                    <Input id="buy-price" value="2,145.78" disabled />
                    <div className="text-xs text-muted-foreground">Market price</div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ArrowUp className="h-4 w-4" />
                        Buy ETH
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="sell">
                <form onSubmit={(e) => handleTrade(e, "sell")} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="sell-amount">Amount (ETH)</Label>
                    <Input id="sell-amount" type="number" step="0.01" min="0.01" placeholder="0.00" required />
                    <div className="text-xs text-muted-foreground">Available: 1.45 ETH</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sell-price">Price (USD)</Label>
                    <Input id="sell-price" value="2,145.78" disabled />
                    <div className="text-xs text-muted-foreground">Market price</div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ArrowDown className="h-4 w-4" />
                        Sell ETH
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
