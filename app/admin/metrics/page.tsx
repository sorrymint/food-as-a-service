import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"


export default function Page() {
  return (
    <main>
        <div className="text-center max-w-2xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Your Website Metrics</h1>
            <p className="mb-2">View insights on your websites performance including revenue, traffic, and trends. </p>
        </div>
        
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
        </div>   
    </main>
  )
}