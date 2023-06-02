import Image from "next/image"
import header from "@/public/header.png"
import Featured1 from "@/public/Featured1.png"
import Featured2 from "@/public/Featured2.png"
import Featured3 from "@/public/Featured3.png"
import Featured4 from "@/public/Featured4.png"
import { FiShoppingCart } from "react-icons/fi"

const Hero = () => {
    return (
        <section className="relative flex gap-x-16 sm:py-8 2xl:px-32 xl:px-24 md:px-16 px-8">
            {/* Left Side */}
            <div className="flex-1 flex flex-col pt-12 py-2 gap-y-10">
                <div className="bg-blue-100 text-blue-600 font-bold w-fit rounded-md px-5 py-2">
                    Sale 70%
                </div>
                <h1 className="sm:text-6xl text-5xl font-bold">An Industrial Take on Streetwear</h1>
                <p className="text-slate-600 max-w-lg">Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>
                <button className="lg:w-fit min-[410px]:w-2/4 w-3/4 flex justify-center items-center gap-x-3 bg-black text-white font-semibold sm:px-16 px-2 py-5">
                    <FiShoppingCart className="shrink-0" color="white" size={25} /> Start Shopping
                </button>
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-3 h-full items-end">
                    <Image width={100} className="h-fit" src={Featured1} alt="" />
                    <Image width={100} className="h-fit" src={Featured2} alt="" />
                    <Image width={100} className="h-fit" src={Featured3} alt="" />
                    <Image width={100} className="h-fit" src={Featured4} alt="" />
                </div>
            </div>
            {/* Right Side */}
            <div className="flex-1 max-lg:hidden">
                <div className="bg-[#ffece3] rounded-full w-[600px] h-[600px]">
                    <Image className="absolute top-0 w-[650px] h-[650px]" src={header} alt="Header Image" />
                </div>
            </div>
        </section>
    )
}

export default Hero