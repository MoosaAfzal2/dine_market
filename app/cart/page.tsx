import Image from "next/image"
import image from "@/public/header.png"
import Quantity from "@/app/shared/Quantity"
import { HiOutlineTrash } from "react-icons/hi"

const Cart = () => {
    return (
        <main className="py-8 2xl:px-32 xl:px-24 md:px-16 px-8">
            <div className="max-w-screen-2xl mx-auto">
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <div className="flex lg:flex-row flex-col lg:items-center gap-16 mt-8">
                    {/* left Side */}
                    <div className="flex flex-[3_1] justify-between">
                        <div className="flex sm:flex-row flex-col w-full gap-4">
                            <Image className="xl:w-64 w-52 shrink h-fit rounded-xl" src={image} alt="" />
                            <div className="w-full space-y-4">
                                <div className="flex justify-between">
                                    <h2 className="text-xl text-[#212121] font-light">Cameryn Sash Tie Dress</h2>
                                    <HiOutlineTrash className="cursor-pointer" size={30} />
                                </div>
                                <h4 className="font-medium text-[#666]">Dress</h4>
                                <h4 className="font-medium">Delivery Estimation</h4>
                                <h4 className="font-medium text-[#ffc700]">5 Working Days</h4>
                                <div className="flex justify-between">
                                    <h4 className="text-xl tracking-widest font-semibold">$545</h4>
                                    <Quantity />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="bg-[#fbfcff] flex-1 flex flex-col gap-8 p-8">
                        <h4 className="text-xl font-bold">Order Summary</h4>
                        <div className="flex justify-between">
                            <h4 className="">Quantity</h4>
                            <h4 className="">1 Product</h4>
                        </div>
                        <div className="flex justify-between">
                            <h4 className="">Sub Total</h4>
                            <h4 className="">$195</h4>
                        </div>
                        <button className="text-white bg-black text-sm font-semibold py-3">Process to Checkout</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart