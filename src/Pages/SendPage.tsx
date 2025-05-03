import AssetList from "@/components/shared/AssetList";
import SendToken from "../components/Send";
import BackHead from "@/components/shared/BacHead";


export default function SendPage() {
  return (
    <section className="w-full p-6">
    <BackHead text="Send Crypto"/>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="col-span-1">
      <AssetList/>
        
      </div>
      <div className="col-span-2">
        
      <SendToken/>
      </div>
    </section>
    </section>
  )
}
