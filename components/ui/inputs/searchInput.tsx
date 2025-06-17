import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from 'lucide-react';

function SearchInput() {
  return (
    <div className="p-0.1 py-1 flex justify-end md:mr-[2.5%] lg:mr-[3%] xl:mr-[10%]">
      <div className=" lg:w-100 flex items-center relative">
        <input className="bg-gray-100  py-1 px-5 rounded-2xl outline-none w-full "
        placeholder=" Search..."
        id="SearchBar"
        name="SearchBar"/>
        <Search className="absolute right-3 size-4" color="gray"/>
      </div>
    </div>
  );
}

export { SearchInput };
