"use client"
import { FiShoppingCart } from 'react-icons/fi'
import Quantity from './Quantity'
import { useState } from 'react'
import { urlForImage } from '@/sanity/lib/image'
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/nextjs'
import { HiOutlineExclamationCircle } from 'react-icons/hi'


const AddOrder = ({ data }: { data: any }) => {
    // Get User id from Clerk
    const { user, isSignedIn } = useUser()

    const [quantity, setquantity] = useState(1)
    const AddOrder = async () => {
        try {
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
            return await res.json()
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
                <button className="disabled:opacity-20 flex justify-center items-center gap-x-3 bg-black text-white text-sm font-semibold sm:px-14 px-2 py-3 max-sm:w-2/5"
                    disabled={!isSignedIn}
                    onClick={() => {
                        const data = AddOrder()
                        toast.promise(data, {
                            loading: 'Adding...',
                            success: (item) => `${quantity + " " + item.data[0].title} Added to Cart`,
                            error: 'Error when fetching',
                        }, {
                            position: "top-right"
                        });
                    }}>
                    <FiShoppingCart className="shrink-0" color="white" size={20} /> Add to Cart
                </button>
                <h3 className="text-2xl font-bold tracking-widest">${data[0].price}</h3>
            </div>
            {!isSignedIn && <h4 className='flex items-center gap-x-1 text-red-500 font-semibold -mt-6'> <HiOutlineExclamationCircle  size={20} className='-mt-0.5'/> Please Sign In First !</h4>}
        </>

    )
}

export default AddOrder