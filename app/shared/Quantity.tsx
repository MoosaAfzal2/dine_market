"use client"

import { Dispatch, SetStateAction } from "react"

const Quantity = ({ quantity, setquantity }: { quantity: number, setquantity: Dispatch<SetStateAction<number>> }) => {
    return (
        <div className="flex items-center gap-3">
            <div onClick={() => { if (quantity > 1) { setquantity?.(quantity - 1) } }} className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full cursor-pointer">-</div>
            {quantity}
            <div onClick={() => setquantity?.(quantity + 1)} className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full cursor-pointer">+</div>
        </div>
    )
}

export default Quantity