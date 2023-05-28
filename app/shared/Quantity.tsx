"use client"
import { useState } from "react"

const Quantity = () => {
    const [Quantity, setQuantity] = useState(1)
    console.log(Quantity);

    return (
        <div className="flex items-center gap-3">
            <div onClick={() => { if (Quantity !== 1) { setQuantity(Quantity - 1) } }} className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full">-</div>
            {Quantity}
            <div onClick={() => { if (Quantity !== 1) { setQuantity(Quantity + 1) } }} className="text-2xl px-3.5 py-1 bg-[#f1f1f1] rounded-full">+</div>
        </div>
    )
}

export default Quantity