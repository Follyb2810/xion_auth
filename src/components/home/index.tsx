import Hero from "./container/Hero"
import { ConnectCard } from "./container/ConnectCard"
import { ConnectCardData } from "./mock"


export default function Home() {
  return (
    <div className="">
        <Hero/>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted mx-auto">
          <div className="mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect your wallet to access these features and more
                </p>
              </div>
            </div>
            <div className="mx-auto grid w-full justify-center items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">

              {
                ConnectCardData.map((data,index:number)=>(
                  <ConnectCard {...data}  key={index}/>
                ))
              }
            </div>
          </div>
        </section>

    </div>
  )
}
