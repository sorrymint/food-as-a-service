import Image from 'next/image';

export default function StartARestaurant() {
  return (
    <main className="px-4 py-4">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
                See Our Work
            </h1>
            <p>
                Explore our restaurant websites we`ve designed, built, and hosted for local businesses. Our work shows how we are 
                able to create custom websites for restaurants under their own brand.
            </p>
        </div>

        <section className="flex flex-col md:flex-row gap-6">
            
            <div className=" w-full md:w-[80%] lg:w-[50%] flex justify-center rounded-lg ">
                <Image
                    src="/restaurant-logo-placeholder.jpg"
                    alt="Placeholder Logo"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover "
                />
            </div>

            <div className="text-center border-2 bg-gray-200 rounded-lg p-5">
                <div className="md:text-left md:ml-10">
                    <h1 className="text-2xl font-medium mb-2">Company Name</h1>

                    <p className="mb-6">
                        Description text - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus mollitia sint odio maiores fugit, 
                        obcaecati, labore illum, iure accusantium porro distinctio tenetur aperiam perferendis explicabo. Facere hic ipsum 
                        perferendis amet.
                    </p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 self-start">View Restaurant</button>
            </div>   

            

        </section>
    </main>
  )
}