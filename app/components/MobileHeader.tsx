"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { RiMenu3Fill } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'

const MobileHeader = () => {
    const [open, setopen] = useState(false)
    return (
        <>
            <RiMenu3Fill onClick={() => setopen(!open)} size={30} className={`${open ? "hidden" : "block"} lg:hidden`} />
            <RxCross2 onClick={() => setopen(!open)} size={30} className={`${open ? "block" : "hidden"} lg:hidden`} />
            <div className={`${open ? "h-72" : "h-0"} overflow-hidden bg-white lg:hidden absolute z-10 top-16 left-0 right-0 transition-all duration-300`}>
                <ul className="flex flex-col items-center text-lg gap-y-6 py-6 lg:hidden">
                    <Link href="/cart" className="bg-slate-200 relative rounded-full p-3 lg:hidden">
                        <FiShoppingCart strokeWidth="2.5" size={20} />
                        <span className="flex items-center justify-center text-white text-xs w-4 h-4 bg-red-500 absolute right-0 top-0 rounded-full">0</span>
                    </Link>
                    <li><Link href="/Female"> Female</Link></li>
                    <li><Link href="/Male">Male </Link></li>
                    <li><Link href="/kids"> Kids </Link></li>
                    <li><Link href="/products">All Products </Link></li>
                </ul>
            </div>
        </>
    )
}

export default MobileHeader