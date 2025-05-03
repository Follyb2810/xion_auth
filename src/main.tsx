import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouteLayout from './RouteLayout.tsx'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import { Toaster } from 'sonner';
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import { AuthProvider } from './context/auth.tsx'
// import { polyfillBuffer } from './helper/bufferPolyfill.ts'

// polyfillBuffer();
const router = RouteLayout();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AbstraxionProvider
        config={
        {
          // treasury: "xion17d2029pa5p9u392ja4etyg6smvdk6lsnh64mu66rs075jrs4nevs37cn3s",
          // treasury: "xion1pznw0ptf2gfkvc6u7tu6k09sm26m99dlfksen5cm2gqfp4qkmjgqzhgr4k",
          treasury: "xion1ec2vfqsxpj36uwe05ahszvnapnm2f9vgfe6sjy50yuc9zey4w28qy0gpfv",
          rpcUrl: "https://rpc.xion-testnet-2.burnt.com:443",
          restUrl: "https://api.xion-testnet-2.burnt.com/",
          
                  
        }
        }
        // config={treasuryConfig}
        >
          
    <AuthProvider>
      
    <RouterProvider router={router} />
    <Toaster expand visibleToasts={9} position="top-center"  />
    </AuthProvider>
        </AbstraxionProvider>
  </StrictMode>,
)
