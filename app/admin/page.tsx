//This will be the homepage for restaurants
// following the main page layout on figma

import Image from 'next/image';
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

export default function HomePage() {
  return (
    <main className="py-6 max-w-7xl space-y-8">
      <section className="flex flex-col md:flex-row gap-8 ">

        <div className="md:w-2/5 flex justify-center md:justify-start">{/* Left card div */}
          <Image 
            src="/create-website-PLACEHOLDER.jpg" 
            alt="A placeholder image" 
            width={400}
            height={400}
            className="rounded-md shadow"
          />
        </div>

              
        <div className="md:w-3/5 flex flex-col justify-between"> {/* Right div*/}
          <div> {/* Info div */}
            <h1 className="text-4xl font-bold mb-6">Restaurants</h1> {/* need to add fonts */}
            <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <a href="#" target="#" className="text-blue-500 underline">
                Learn More
            </a>
          </div>
          <div className="flex flex-wrap gap-4 mt-6"> {/* Buttons div */}
            <button className="bg-black text-white px-4 py-2 rounded-full">
                View Restaurants
            </button>
            <button className="bg-White text-black border border-black px-4 py-2 rounded-full">
                Start a Restaurant
            </button>
          </div>
        </div>

      </section>

      {/* Bottom half div */}
        <section>
          <ChartAreaInteractive />
        </section>
      
      
    </main>
  );
}