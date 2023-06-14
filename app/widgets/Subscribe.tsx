
const Subscribe = () => {
    return (
        <section className='flex justify-center items-center relative sm:py-36 py-20'>
            <h1 className='absolute text-[#f2f3f7] tracking-wide lg:text-[7rem] sm:text-8xl min-[470px]:text-7xl text-6xl leading-none font-black'>Newsletter</h1>
            <div className='flex flex-col text-center items-center gap-y-3 z-10'>
                <h3 className='sm:text-[2rem] text-3xl tracking-wide font-bold'>Subscribe Our Newsletter</h3>
                <p className='font-light text-black'>Get the latest information and promo offers directly</p>
                <div className='flex min-[550px]:flex-row flex-col items-center w-full gap-3 mt-5'>
                    <input className='grow max-[550px]:w-4/5 flex leading-none text-[0.80rem] font-light placeholder-black border border-black px-4 py-2.5' type="text" placeholder='Input email address'/>
                    <button className='flex w-fit justify-center items-center bg-black text-sm text-white font-semibold px-5 py-2.5'>Get Started</button>
                </div>
            </div>
        </section>
    )
}

export default Subscribe