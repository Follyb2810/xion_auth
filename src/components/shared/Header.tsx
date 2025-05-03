import { WalletConnect } from './wallet-connect'
import { Coins } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-2">
        <Coins className="h-6 w-6" />
        <span className="text-xl font-bold">CryptoApp</span>
      </div>
      <WalletConnect />
    </div>
  </header>
  )
}
