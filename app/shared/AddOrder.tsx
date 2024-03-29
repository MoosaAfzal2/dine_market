"use client"
import { FiShoppingCart } from 'react-icons/fi'
import Quantity from './Quantity'
import { useState } from 'react'
import { urlForImage } from '@/sanity/lib/image'
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/nextjs'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { OrderType } from '../lib/Drizzle'
import { mutate } from 'swr'


const AddOrder = ({ data }: { data: any }) => {
    // Get User id from Clerk
    const { user, isSignedIn } = useUser()

    const [quantity, setquantity] = useState(1)
    const AddOrder = async () => {
        try {
            // Update Product if Exists
            const cart_data: OrderType[] = await fetch(`/api/Orders/${data[0]._id}`).then((res) => res.json())
            if (cart_data.length !== 0) {
                await fetch("/api/Orders", {
                    method: "PATCH",
                    body: JSON.stringify({
                        Data: [{
                            id: cart_data[0].id,
                            quantity: cart_data[0].quantity + quantity,
                        }]
                    })
                })
                mutate("/api/Orders")
                // else Add The Product
            } else {
                const image_url = urlForImage(data[0].image[0].asset._ref).url();
                const res = await fetch("/api/Orders", {
                    method: "POST",
                    body: JSON.stringify({
                        user_id: user?.id,
                        product_id: data[0]._id,
                        title: data[0].title,
                        category: data[0].category,
                        quantity: quantity,
                        price: data[0].price,
                        image_url: image_url
                    })
                })
                mutate("/api/Orders")
                return await res.json()
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Toaster />
            <div className="flex gap-5 items-center">
                <h4 className="font-bold">Quantity:</h4>
                <Quantity quantity={quantity} setquantity={setquantity} />
            </div>
            <div className="flex items-center gap-3">
                <button className="disabled:opacity-20 flex justify-center items-center gap-x-3 bg-black text-white text-sm font-semibold sm:px-14 px-4 py-3"
                    disabled={!isSignedIn}
                    onClick={() => {
                        const added_data = AddOrder()
                        toast.promise(added_data, {
                            loading: 'Adding...',
                            success: () => `${quantity + " " + data[0].title} Added to Cart`,
                            error: 'Error when fetching',
                        }, {
                            position: "top-right"
                        });
                    }}>
                    <FiShoppingCart className="shrink-0" color="white" size={20} /> Add to Cart
                </button>
                <h3 className="text-2xl font-bold tracking-widest">${data[0].price}</h3>
            </div>
            {!isSignedIn && <h4 className='flex items-center gap-x-1 text-red-500 font-semibold -mt-6'> <HiOutlineExclamationCircle size={20} className='-mt-0.5' /> Please Sign In First !</h4>}
        </>

    )
}

export default AddOrder