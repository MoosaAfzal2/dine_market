"use client"
import { useState } from "react"

const Quantity = () => {
    const [Quantity, setQuantity] = useState(1)
    return (
        <div className="flex items-center gap-3">
            <div onClick={() => { if (Quantity > 1) { setQuantity(Quantity - 1) } }} className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full cursor-pointer">-</div>
            {Quantity}
            <div onClick={() => setQuantity(Quantity + 1)} className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full cursor-pointer">+</div>
        </div>
    )
}

export default Quantity