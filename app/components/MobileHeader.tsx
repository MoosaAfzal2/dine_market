"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import CartIcon from '@/app/shared/CartIcon'

const MobileHeader = () => {
    const [open, setopen] = useState(false)
    return (
        <>
            <RiMenu3Fill onClick={() => setopen(!open)} size={30} className={`${open ? "hidden" : "block"} lg:hidden`} />
            <RxCross2 onClick={() => setopen(!open)} size={30} className={`${open ? "block" : "hidden"} lg:hidden`} />
            <div className={`${open ? "h-72" : "h-0"} overflow-hidden bg-white lg:hidden absolute z-10 top-16 left-0 right-0 transition-all duration-300`}>
                <ul className="flex flex-col items-center text-lg gap-y-6 py-6 lg:hidden">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden">
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="border text-sm px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">Sign in</button>
                                </SignInButton>
                            </SignedOut>
                        </div>
                        <CartIcon mobile={true} />
                    </div>
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