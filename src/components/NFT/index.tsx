import {  useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent,  CardFooter } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
// import { WalletConnect } from "./../../components/shared/wallet-connect"
import { Link } from "react-router-dom"
// import { useToast } from "../../hook/useToast"
import { ArrowLeft, Grid3X3, LayoutGrid, ListFilter } from "lucide-react"


interface NFT {
  id: string
  name: string
  image: string
  price: string
  collection: string
}

export default function NFT() {
  const [view, setView] = useState<"grid" | "list">("grid")
  // const navigate = useNavigate()
  // const  toast  = useToast()

  // Sample NFT data
  const nfts: NFT[] = [
    {
      id: "1",
      name: "Cosmic Voyager #142",
      image: "/placeholder.svg?height=400&width=400",
      price: "0.45 ETH",
      collection: "Cosmic Voyagers",
    },
    {
      id: "2",
      name: "Digital Dream #089",
      image: "/placeholder.svg?height=400&width=400",
      price: "0.32 ETH",
      collection: "Digital Dreams",
    },
    {
      id: "3",
      name: "Neon Horizon #217",
      image: "/placeholder.svg?height=400&width=400",
      price: "0.56 ETH",
      collection: "Neon Horizons",
    },
    {
      id: "4",
      name: "Pixel Punk #033",
      image: "/placeholder.svg?height=400&width=400",
      price: "0.78 ETH",
      collection: "Pixel Punks",
    },
    {
      id: "5",
      name: "Ethereal Entity #412",
      image: "/placeholder.svg?height=400&width=400",
      price: "0.25 ETH",
      collection: "Ethereal Entities",
    },
    {
      id: "6",
      name: "Virtual Vanguard #167",
      image: "/placeholder.svg?height=400&width=400",
      price: "0.63 ETH",
      collection: "Virtual Vanguards",
    },
  ]

  

  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">NFT Marketplace</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("grid")}
            className={view === "grid" ? "bg-muted" : ""}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("list")}
            className={view === "list" ? "bg-muted" : ""}
          >
            <ListFilter className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="explore">
        <TabsList className="mb-8">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="my-nfts">My NFTs</TabsTrigger>
        </TabsList>

        <TabsContent value="explore">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Trending NFTs</h2>
            <Button variant="outline" size="sm">
              <Grid3X3 className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nfts.map((nft) => (
                <Card key={nft.id} className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-1 text-sm text-muted-foreground">{nft.collection}</div>
                    <h3 className="font-semibold">{nft.name}</h3>
                    <div className="mt-2 font-medium">{nft.price}</div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="secondary" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {nfts.map((nft) => (
                <Card key={nft.id}>
                  <div className="flex flex-col sm:flex-row">
                    <div className="aspect-square h-24 w-24 overflow-hidden sm:h-32 sm:w-32">
                      <img
                        src={nft.image || "/placeholder.svg"}
                        alt={nft.name}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <div className="mb-1 text-sm text-muted-foreground">{nft.collection}</div>
                        <h3 className="font-semibold">{nft.name}</h3>
                      </div>
                      <div className="mt-2 font-medium">{nft.price}</div>
                    </div>
                    <div className="flex items-center p-4">
                      <Button variant="secondary">View Details</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="collections">
          <div className="flex flex-col items-center justify-center py-12">
            <h3 className="mb-2 text-xl font-semibold">Collections Coming Soon</h3>
            <p className="text-muted-foreground">We're working on bringing you the best NFT collections.</p>
          </div>
        </TabsContent>

        <TabsContent value="my-nfts">
          <div className="flex flex-col items-center justify-center py-12">
            <h3 className="mb-2 text-xl font-semibold">No NFTs Found</h3>
            <p className="text-muted-foreground">You don't own any NFTs yet. Start exploring the marketplace.</p>
            <Button className="mt-4">Explore Marketplace</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
