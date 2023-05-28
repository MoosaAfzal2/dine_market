import Image from "next/image"
import Logo from "@/public/Logo.png"
import { TiSocialFacebook } from "react-icons/ti"
import { TiSocialTwitter } from "react-icons/ti"
import { RiLinkedinFill } from "react-icons/ri"
import Link from "next/link"

const Footer = () => {
    return (
        <footer>
            <div className="grid lg:grid-cols-5 grid-cols-1 max-lg:gap-8 py-24 2xl:px-32 xl:px-24 md:px-16 px-8">
                <div className="lg:col-span-2 flex flex-col justify-between max-lg:gap-8">
                    <Image width={180} height={30} src={Logo} alt="Logo" />
                    <p className="text-[#666] lg:w-4/5 sm:w-3/5 w-5/6">Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</p>
                    <div className="flex gap-4">
                        <div className="flex bg-[#f1f1f1] p-2 rounded-lg">
                            <TiSocialTwitter size={25} />
                        </div>
                        <div className="flex bg-[#f1f1f1] p-2 rounded-lg">
                            <TiSocialFacebook size={25} />
                        </div>
                        <div className="flex bg-[#f1f1f1] p-3 rounded-lg">
                            <RiLinkedinFill size={20} />
                        </div>
                    </div>
                </div>
                <div className="text-[#666]">
                    <h3 className="text-xl font-semibold mb-4">Company</h3>
                    <ul className="flex flex-col gap-3.5">
                        <Link href=""><li>About</li></Link>
                        <Link href=""><li>Terms of Use</li></Link>
                        <Link href=""><li>Privacy Policy</li></Link>
                        <Link href=""><li>How it Works</li></Link>
                        <Link href=""><li>Contact Us</li></Link>
                    </ul>
                </div>
                <div className="text-[#666]">
                    <h3 className="text-xl font-semibold mb-4">Support</h3>
                    <ul className="flex flex-col gap-3.5">
                        <Link href=""><li>Support Carrer</li></Link>
                        <Link href=""><li>24h Service</li></Link>
                        <Link href=""><li>Quick Chat</li></Link>
                    </ul>
                </div>
                <div className="text-[#666]">
                    <h3 className="text-xl font-semibold mb-4">Contact</h3>
                    <ul className="flex flex-col gap-3.5">
                        <Link href=""><li>Whatsapp</li></Link>
                        <Link href=""><li>Support 24h</li></Link>
                    </ul>
                </div>
            </div>
            <hr className="h-0.5 bg-black"/>
            <div className="text-[#666] grid md:grid-cols-3 sm:grid-cols-2 gap-4 py-6 2xl:pl-32 xl:pl-24 md:pl-16 pl-8">
                <h3>Copyright © 2022 Dine Market</h3>
                <h3>Design by. <b className="text-black">Weird Design Studio</b></h3>
                <h3>Code by. <b className="text-black">moosaafzal2 on github</b></h3>
            </div>
        </footer>
    )
}

export default Footer