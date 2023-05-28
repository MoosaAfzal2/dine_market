import Image from "next/image"
import Logo from "@/public/Logo.png"
import { CiSearch } from "react-icons/Ci"
import { FiShoppingCart } from "react-icons/fi"
import { RiMenu3Fill } from "react-icons/ri"
import Link from "next/link"

const Header = () => {
    return (
        <header className="flex items-center justify-between py-8 2xl:px-32 xl:px-24 md:px-16 px-8">
            <Link href="/">
                <Image src={Logo} alt="Logo" />
            </Link>
            <ul className="flex text-lg gap-x-10 max-lg:hidden">
                <li><Link href="/Female"> Female</Link></li>
                <li><Link href="/Male">Male </Link></li>
                <li><Link href="/kids"> Kids </Link></li>
                <li><Link href="/products">All Products </Link></li>
            </ul>
            <div className="w-1/3 max-w-md flex items-center border rounded-md font-light overflow-hidden pl-2 max-lg:hidden">
                <CiSearch size={15} />
                <input className="grow placeholder-black text-[0.80rem] leading-none px-1 py-1.5" type="search" placeholder="What you looking for" />
            </div>
            <Link href="/cart" className="bg-slate-200 relative rounded-full p-3 max-lg:hidden">
                <FiShoppingCart strokeWidth="2.5" size={20} />
                <span className="flex items-center justify-center text-white text-xs w-4 h-4 bg-red-500 absolute right-0 top-0 rounded-full">0</span>
            </Link>
            {/* Menu */}
            <RiMenu3Fill size={30} className="lg:hidden" />
        </header>
    )
}

export default Header