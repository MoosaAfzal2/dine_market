"use client"
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import { HiOutlineTrash } from 'react-icons/hi'

const DeleteOrder = ({ ID, Title, Quantity, mutate }: { ID: number, Title: string, Quantity: number, mutate: () => void }) => {
    const { refresh } = useRouter()
    const deleteOrder = async () => {
        try {
            const res = await fetch("/api/Orders", {
                method: "DELETE",
                body: JSON.stringify({
                    id: ID
                })
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
            <HiOutlineTrash className="cursor-pointer" size={30}
                onClick={() => {
                    const data = deleteOrder()
                    toast.promise(data, {
                        loading: 'Removing...',
                        success: () => `${Quantity + " " + Title} has been Removed`,
                        error: 'Error when fetching',
                    }, {
                        position: "top-right"
                    });
                    mutate()
                }} />
        </>
    )
}

export default DeleteOrder