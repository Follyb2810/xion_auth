import { useState } from "react";
import { useToast } from "./useToast";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const toast = useToast()

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(
        text || "0x0000000000000000000000000000000000000000"
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast.success(`You copy ${text}`)
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return { copied, copy };
}
