import { Loader2 } from "lucide-react";

export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
      <Loader2 className="animate-spin h-6 w-6 mb-2 text-blue-500" />
      <p>{text}</p>
    </div>
  );
}
