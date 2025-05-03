import { LoaderPinwheel } from "lucide-react";

export default function Preload() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-border z-50">
      <div className="text-center">
        <div className="relative flex items-center justify-center">
          <LoaderPinwheel className="h-24 w-24 sm:h-28 sm:w-28 animate-spin text-primary"/>
          {/* <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-codeline-100 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            
          </div> */}
        </div>

      
        <p className="mt-6 text-lg font-medium text-primary">
          Please wait, loading...
        </p>
      </div>
    </div>
  );
}
