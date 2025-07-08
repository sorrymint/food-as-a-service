//This will be the homepage for restaurants
// following the main page layout on figma
import { TrafficChart } from "@/components/TrafficChart";
import Image from 'next/image';

export default function HomePage() {
    return (
        <main className="flex flex-col gap-20 p-22">

            <div className="flex justify-between gap-32"> {/* Top half div */}
                <div className="w-2/5 min-w-[400px]">{/* Left card div */}
                    <Image 
                        src="/create-website-PLACEHOLDER.jpg" 
                        alt="A cartoon of a guy building a website" 
                        width={400}
                        height={300}
                        className="rounded-md shadow"
                    />
                </div>

                
                <div className="w-3/5"> {/* Right div*/}
                    <div> {/* Info div */}
                        <h1 className="text-4xl font-bold mb-6">Restaurants</h1> {/* need to add fonts */}
                        <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <a href="#" target="#" className="text-blue-500 underline">
                            Learn More
                        </a>
                    </div>
                    <div className="flex justify-between mt-2"> {/* Buttons div */}
                        <button className="bg-black text-white px-4 py-2 rounded-full">
                            View Restaurants
                        </button>
                        <button className="bg-White text-black border border-black px-4 py-2 rounded-full">
                            Start a Restaurant
                        </button>
                    </div>
                </div>
            </div>


            <div className="flex justify-between"> {/* Bottom half div */}
                <div className="bg-white p-3 rounded-lg shadow"> 
                    <TrafficChart />
                </div>
                {/* <div className="bg-white p-30 rounded-lg shadow">
                    <h1>Card 2</h1>
                </div>
                <div className="bg-white p-30 rounded-lg shadow">
                    <h1>Card 3</h1>
                </div> */}
            </div>
        </main>
    );
}