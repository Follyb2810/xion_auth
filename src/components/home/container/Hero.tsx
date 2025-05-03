import { WalletConnect } from '@/components/shared/wallet-connect'

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Your Gateway to the Decentralized World
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Connect your wallet to access our full suite of crypto services including sending, trading,
              swapping, and NFT marketplace.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <WalletConnect asButton />
          </div>
        </div>
        <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
          <img
            src="/placeholder.svg?height=550&width=550"
            width={550}
            height={550}
            alt="Crypto illustration"
            className="mx-auto h-auto w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  </section>
  )
}
