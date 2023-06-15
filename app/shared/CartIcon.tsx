"use client"
import Link from 'next/link'
import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { OrderType } from '../lib/Drizzle'
import useSWR from 'swr';

// fetcher function
const fetcher = (url: string): Promise<OrderType[]> => fetch(url).then((res) => res.json());

const CartIcon = ({ mobile = false }: { mobile?: boolean }) => {
    const { data } = useSWR(`/api/Orders`, fetcher);
    let quantities_sum = 0
    if (data && data.length !== 0) {
        const quantities = data?.map((item: OrderType) => item.quantity)
        quantities_sum = quantities?.reduce((Sum, i) => Sum + i);
    }
    return (
        <Link href="/cart" className={`bg-slate-200 relative rounded-full p-3 ${mobile ? "lg:hidden" : "max-lg:hidden"}`}>
            <FiShoppingCart strokeWidth="2.5" size={20} />
            <span className="flex items-center justify-center text-white text-xs w-4 h-4 bg-red-500 absolute right-0 top-0 rounded-full">{quantities_sum}</span>
        </Link>
    )
}

export default CartIcon