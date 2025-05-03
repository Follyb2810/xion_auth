import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
  } from "react-router-dom";
  import { Suspense, lazy } from "react";
import Preload from "./components/shared/Preload";
import Layout from "./Pages/Layout";
import ErrorBoundary from "./Pages/ErrorBoundary";
import ProtectedRoutes from "./Pages/ProtectedRoutes.tsx";
// import Layout from "./page/Layout";
// import ErrorBoundary from "./page/ErrorBoundary";
// import Preload from "./components/shared/Preload";
// import ProtectedRoutes from "./page/ProtectedRoutes";
// import { Roles } from "./@types/types";

  

  const App = lazy(() => import("./App"));
  const NftPage = lazy(() => import("./Pages/NftPage"));
  const SendPage = lazy(() => import("./Pages/SendPage.tsx"));
  const SwapPage = lazy(() => import("./Pages/SwapPage.tsx"));
  const TradePage = lazy(() => import("./Pages/TradePage.tsx"));
  // const Buyer = lazy(() => import("./page/Buyer"));
  // const AuthPage = lazy(() => import("./page/AuthPage"));
  
  const LazyWrapper = (Component: React.ComponentType) => (
    <Suspense fallback={<Preload />}>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </Suspense>
  );
  
  
  
  export default function RouteLayout() {
    return createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={LazyWrapper(App)} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/nft" element={LazyWrapper(NftPage)} />
              <Route path="/send" element={LazyWrapper(SendPage)} />
              <Route path="/swap" element={LazyWrapper(SwapPage)} />
              <Route path="/trade" element={LazyWrapper(TradePage)} />
            </Route>
            {/* 
            <Route element={<ProtectedRoutes allowedRoles={[Roles.BUYER,Roles.SELLER]} />} path="shop">
                <Route index element={LazyWrapper(Shop)} />
                <Route path="buyer_cart" element={LazyWrapper(Buyer)} />
                <Route path=":productId" element={LazyWrapper(Product)} />
                <Route path="product/:productId" element={LazyWrapper(Cart)} />
              </Route>
            <Route element={<ProtectedRoutes allowedRoles={[Roles.SELLER]} />} path="seller">
                <Route index element={LazyWrapper(Seller)} />
              </Route> */}
          </Route>
          {/* <Route path="*" element={LazyWrapper(NotFound)} /> */}
        </>
      )
    );
  }
  
  
  
  