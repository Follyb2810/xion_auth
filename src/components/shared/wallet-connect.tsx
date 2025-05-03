import { useState, useEffect, useCallback, useRef } from "react";
import { Clipboard, Wallet } from "lucide-react";
import { useToast } from "./../../hook/useToast";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useMeta from "@/hook/useMeta";
import { Abstraxion } from "@burnt-labs/abstraxion";
import { maskAddress } from "./../../helper/maskAddress";
import { useAuth } from "@/context/useAuth";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCopyToClipboard } from "@/hook/useCopyToClipboard";

interface WalletConnectProps {
  asButton?: boolean;
}

export function WalletConnect({ asButton = false }: WalletConnectProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    setShow,
    bech32Address,
    isConnected,
    isConnecting,
    logout: metaLogout,
  } = useMeta();
  const { copied, copy } = useCopyToClipboard();
  const {
    setAuthenticated,
    logout: authLogout,
    isAuthenticated,
    user,
  } = useAuth();
  console.log(user?.walletAddress);
  const authInProgress = useRef(false);
  const [authLoading, setAuthLoading] = useState(false);

  const handleConnect = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleAuth = useCallback(async () => {
    const loadingToast = toast.loading("Authenticating wallet...");
    try {
      if (authInProgress.current || !bech32Address) return;
      authInProgress.current = true;
      setAuthLoading(true);

      setAuthenticated(bech32Address);
      localStorage.setItem("walletConnected", "true");
      localStorage.setItem("walletAddress", bech32Address);

      toast.dismiss(loadingToast);
      toast.success("Wallet connected successfully.");
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      authInProgress.current = false;
      setAuthLoading(false);
    }
  }, [bech32Address, setAuthenticated, toast]);

  const disconnectWallet = useCallback(() => {
    authLogout();
    metaLogout?.();
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
    toast.success("Wallet disconnected successfully.");

    const currentPath = window.location.pathname;
    if (currentPath !== "/" && currentPath !== "/home") {
      navigate("/");
    }
  }, [authLogout, metaLogout, navigate, toast]);

  useEffect(() => {
    const checkConnection = () => {
      // Here if you want you can add connection auto-check
    };

    checkConnection();
    window.addEventListener("storage", checkConnection);
    return () => {
      window.removeEventListener("storage", checkConnection);
    };
  }, []);

  useEffect(() => {
    if (
      isConnected &&
      !isConnecting &&
      bech32Address &&
      !isAuthenticated &&
      !authInProgress.current
    ) {
      handleAuth();
    }

    if (!isConnected && isAuthenticated && !isConnecting) {
      disconnectWallet();
    }
  }, [
    isConnected,
    isConnecting,
    bech32Address,
    isAuthenticated,
    handleAuth,
    disconnectWallet,
  ]);

  const buttonContent = isConnecting
    ? "Connecting..."
    : isConnected
    ? "Disconnect Wallet"
    : "Connect Wallet";

  if (asButton) {
    return (
      <>
        <Button
          onClick={isConnected ? disconnectWallet : handleConnect}
          disabled={isConnecting || authLoading}
          className="gap-2"
          size="lg"
        >
          <Wallet className="h-4 w-4" />
          {buttonContent}
        </Button>
        <Abstraxion onClose={() => setShow(false)} />
      </>
    );
  }

  return (
    <div>
      {isConnected && bech32Address ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2 border rounded-xl py-2 px-4 hover:bg-muted transition cursor-pointer">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">
                {maskAddress(bech32Address)}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4 rounded-xl shadow-lg border bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>{maskAddress(bech32Address)}</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium break-all">
                  {maskAddress(bech32Address)}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span>{copied ? "Copied!" : maskAddress(bech32Address)}</span>
                <Clipboard
                  size={18}
                  className="cursor-pointer text-muted-foreground hover:text-foreground transition"
                  onClick={() => copy(bech32Address)}
                />
              </div>

              <Button
                onClick={disconnectWallet}
                variant="destructive"
                className="w-full text-sm"
              >
                Disconnect
              </Button>
            </div>
          </PopoverContent>

          {/* <PopoverContent className="w-48">
            <div className="flex flex-col items-start space-y-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>{maskAddress(bech32Address)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                <span className="text-sm">
                  {copied ? "Copied!" : maskAddress(bech32Address)}
                </span>
                <Clipboard
                  size={18}
                  className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                  onClick={() => copy(bech32Address)}
                />
              </div>
              <Button
                onClick={disconnectWallet}
                variant="destructive"
                className="w-full"
              >
                Disconnect
              </Button>
            </div>
          </PopoverContent> */}
        </Popover>
      ) : (
        <Button
          onClick={handleConnect}
          disabled={isConnecting || authLoading}
          className="gap-2"
        >
          <Wallet className="h-4 w-4" />
          {isConnecting
            ? "Connecting..."
            : authLoading
            ? "Authenticating..."
            : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
}
