"use client"
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import { OrderType } from '../lib/Drizzle'
import { Dispatch, SetStateAction } from 'react';

const UpdateOrders = ({ Data, mutate, SetDisable }: { Data: OrderType[], mutate: () => void, SetDisable: Dispatch<SetStateAction<boolean>> }) => {
    const { refresh } = useRouter()
    const updateOrders = async () => {
        try {
            const res = await fetch("/api/Orders", {
                method: "PATCH",
                body: JSON.stringify({ Data })
            })
            return await res.json()
        }
        catch (err) {
            console.log(err)
        }
        refresh()
    }

    return (
        <>
            <Toaster />
            <button className="text-white bg-black text-sm font-semibold py-3"
                onClick={() => {
                    const data = updateOrders()
                    toast.promise(data, {
                        loading: 'Updating...',
                        success: () => {
                            SetDisable(false)
                            return `Orders Updated Successfully`
                        },
                        error: 'Error when fetching',
                    }, {
                        position: "top-right"
                    });
                    mutate()
                }}>Update Orders</button>
        </>
    )
}

export default UpdateOrders