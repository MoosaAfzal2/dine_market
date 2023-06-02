"use client"
import useSWR from 'swr';
import { OrderType } from '../lib/Drizzle';
import Image from 'next/image';
import DeleteOrder from '../shared/DeleteOrder';
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

// fetcher function
const fetcher = (url: string): Promise<OrderType[]> => fetch(url).then((res) => res.json());

export default function Cart() {
    // data fetch
    const { data, error, mutate } = useSWR(`/api/Orders`, fetcher);
    // States
    const [quantity, setquantity] = useState(0)
    const [Total, setTotal] = useState(0)
    const [Data, setData] = useState<OrderType[]>()
    // Refresh Function
    const { refresh } = useRouter()

    // This Sets data from useSWR
    useEffect(() => {
        setData(data)
        // If there is new data from the api this refreshes the page
        refresh()
    }, [data])

    // This sets the Order Summary Data
    useEffect(() => {
        if (Data && Data?.length !== 0) {
            const quantities = Data.map((item: OrderType) => item.quantity)
            const quantities_sum = quantities.reduce((Sum, i) => Sum + i);
            const prices = Data.map((item: OrderType) => item.quantity * item.price)
            const prices_sum = prices.reduce((Sum, i) => Sum + i);
            setquantity(quantities_sum as number)
            setTotal(prices_sum as number)
        }
    }, [Data])

    //  function to Increase Quantity
    function IncreaseQuanitity(id: number) {
        let newdata = [...Data!];
        const quantity = newdata?.find(item => item.id === id);
        if (quantity) {
            quantity!.quantity = quantity.quantity + 1;
        }
        setData(newdata);
    }

    //  function to Decrease Quantity
    function DecreaseQuanitity(id: number) {
        let newdata = [...Data!];
        const quantity = newdata?.find(item => item.id === id);
        if (quantity) {
            quantity.quantity = quantity.quantity - 1;
        }
        setData(newdata);
    }

    if (error) return <div className='text-lg font-semibold py-8 2xl:px-32 xl:px-24 md:px-16 px-8'>Failed to load</div>;
    if (!data) return <div className='text-lg font-semibold py-8 2xl:px-32 xl:px-24 md:px-16 px-8'>Loading...</div>;
    return (
        <main className="py-8 2xl:px-32 xl:px-24 md:px-16 px-8">
            <div className="max-w-screen-2xl mx-auto">
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <div className="flex lg:flex-row flex-col gap-16 mt-8">
                    {/* left Side */}
                    <div className="flex-[3_1] space-y-10">
                        {Data?.map((items: OrderType) => {
                            return (
                                <div key={items.id} className="flex justify-between mt-2">
                                    <div className="flex sm:flex-row flex-col w-full gap-4">
                                        <Image width="224" height="208" className="xl:w-64 w-52 h-52 rounded-xl" src={items.image_url} alt="" />
                                        <div className="w-full space-y-4">
                                            <div className="flex justify-between">
                                                <h2 className="text-xl text-[#212121] font-light">{items.title}</h2>
                                                <DeleteOrder mutate={mutate} ID={items.id} Title={items.title} Quantity={items.quantity}/>
                                            </div>
                                            <h4 className="font-medium text-[#666]">{items.category}</h4>
                                            <h4 className="font-medium">Delivery Estimation</h4>
                                            <h4 className="font-medium text-[#ffc700]">5 Working Days</h4>
                                            <div className="flex justify-between">
                                                <h4 className="text-xl tracking-widest font-semibold">${items.price}</h4>
                                                <div className="flex items-center gap-3">
                                                    <div onClick={() => {
                                                        if (items.quantity > 1) {
                                                            DecreaseQuanitity(items.id)
                                                        }
                                                    }} className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full cursor-pointer">-</div>

                                                    {items.quantity}

                                                    <div onClick={() => IncreaseQuanitity(items.id)} className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full cursor-pointer">+</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* Right Side */}
                    <div className="bg-[#fbfcff] flex-1 flex flex-col gap-8 p-8">
                        <h4 className="text-xl font-bold">Order Summary</h4>
                        <div className="flex justify-between">
                            <h4>Quantity</h4>
                            <h4>{quantity} Product</h4>
                        </div>
                        <div className="flex justify-between">
                            <h4>Sub Total</h4>
                            <h4>${Total}</h4>
                        </div>
                        <button className="text-white bg-black text-sm font-semibold py-3">Process to Checkout</button>
                    </div>
                </div>
            </div>
        </main>
    );
}