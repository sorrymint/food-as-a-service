import Link from "next/link";
import { Facebook, Instagram, Languages, Twitter } from 'lucide-react';

export default function Footer(){
    return (
        <footer className=' flex flex-col gap-10 px-10 py-3 border-t-gray-200 border-t-1 lg:px-20'>
            <div className='flex flex-col md:flex-row gap-10 '>
                <h2 className='font-extrabold text-3xl mr-5 '>LOGO</h2>
                <nav className='flex flex-col items-start gap-1 w-full md:ml-10 lg:ml-[20%]'>
                    <h3 className='font-bold text-lg mb-2'>Learn More</h3>
                    <Link href='#' className='gi'>Locations</Link>
                    <Link href='#'>Mission</Link>
                    <Link href='#'>Terms</Link>
                    <Link href='#'>Get Help</Link>
                </nav>
                <nav className='flex flex-col w-full items-start gap-1'>
                    <h3 className='font-bold text-lg mb-2'>Business</h3>
                    <Link href='/DineDirect'>Register Business</Link>
                    <Link href='#'>Become a Driver</Link>
                    <Link href='/pricing'>Pricings</Link>
                    <Link href='#'>Private Policy</Link>
                </nav>
            </div>
            <nav className='flex flex-col-reverse md:flex-row gap-5 md:gap-18 lg:items-center lg:gap-78 '>
                <div className='flex gap-5'>
                    <Link href='#'><Twitter size={20}/></Link>
                    <Link href='#'><Facebook size={20}/></Link>
                    <Link href='#'><Instagram size={20}/></Link>
                </div>
                <div className='flex gap-20 lg:gap-44 '>
                    <button ><Languages size={20} className='inline'/> Translate</button>
                    <Link href='#'>Review</Link>
                    <Link href='#'>Contact</Link>
                </div>
            </nav>
        </footer>
    );
}
