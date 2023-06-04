import Link from "next/link"

const SuccessPage = () => {
    return (
        <main className="sm:py-8 2xl:px-32 xl:px-24 md:px-16 px-8">
            <div className="bg-[#f1f1f1] text-center py-24 rounded-2xl">
                <div className="w-fit flex flex-col items-center gap-y-6 mx-auto">
                    <svg stroke="currentColor" fill="green" strokeWidth="0" viewBox="0 0 16 16" height="80" width="80" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path></svg>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold">Thank you for your order!</h1>
                        <h3>Check your email inbox for the receipt</h3>
                    </div>
                    <h3>If you have any questions, please email <span><a className="text-red-500 font-medium" href=""> dinemarket@example.com</a></span> </h3>
                    <Link className="w-full flex justify-center" href="/">
                        <button className="bg-black text-white text-lg font-bold w-full max-w-sm py-3 rounded-xl">Continue Shopping</button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default SuccessPage