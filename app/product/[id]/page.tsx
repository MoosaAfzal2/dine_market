import AddOrder from "@/app/shared/AddOrder"
import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image"

const GetSanityData = async (title: string) => {
    const res = await client.fetch(`*[_type=='products' && title=='${title}']{
        _id,
        title,
        category,
        gender,
        price,
        product_care,
        details,
        image
      }`)
    return await res
}


const ProductDetails = async ({ params }: { params: { id: string } }) => {
    const data = await GetSanityData(params.id.split("-").join(" "))
    return (
        <main className="bg-slate-50/30 sm:py-16 2xl:px-32 xl:px-24 md:px-16 px-8">
            <div className="flex lg:flex-row flex-col gap-4 ">
                {/* Left Side */}
                <div className="flex flex-[2_1] max-w-screen-lg gap-8">
                    <div className="flex flex-col gap-4">
                        {data[0].image.map((item: any, i: number) => {
                            const image_url = urlForImage(item.asset._ref).url();
                            return (
                                <div key={i}>
                                    <Image width="115" height="100" src={image_url} alt="" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full">
                        <Image className="w-full" width="500" height="500" unoptimized={true} src={urlForImage(data[0].image[0].asset._ref).url()} alt="" />
                    </div>
                </div>
                {/* right side */}
                <div className="flex-1 max-w-lg">
                    <div className="flex flex-col gap-7 w-fit py-14 lg:mx-auto">
                        <div>
                            <h1 className="text-[1.675rem] tracking-wide">{data[0].title}</h1>
                            <h3 className="text-xl font-semibold opacity-30">{data[0].category}</h3>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">SELECT SIZE</h4>
                            <div className="flex items-center gap-4">
                                {["XS", "S", "M", "L", "XL"].map((item: any, i: number) => (
                                    <div className="w-10 h-10 flex items-center justify-center text-[#666] font-bold hover:shadow-[0_0_15px_0_#b2b2b2] rounded-full cursor-pointer" key={i}>{item}</div>
                                ))}
                            </div>
                        </div>
                        <AddOrder data={data} />
                    </div>
                </div>
            </div>
            {/* bottom Side */}
            <div className="bg-white flex flex-col gap-8 mt-28 sm:px-14 px-8 py-20">
                <div className="flex items-center border-b-2 border-[#c4c4c4] relative">
                    <h3 className="absolute text-2xl font-semibold">Product Information</h3>
                    <h1 className='text-[#f2f3f7] xl:text-[7rem] sm:text-8xl text-7xl leading-none font-black'>Overview</h1>
                </div>
                <div className="flex sm:flex-row flex-col max-sm:space-y-2 justify-between">
                    <h3 className="text-[#666] flex-1 font-semibold">PRODUCT DETAILS</h3>
                    <p className="flex-[2_1] font-light leading-7">{data[0].details[0].children[0].text}</p>
                </div>
                <div className="flex sm:flex-row flex-col max-sm:space-y-2 justify-between">
                    <h3 className="text-[#666] flex-1 font-semibold">PRODUCT DETAILS</h3>
                    <ul className="flex-[2_1] flex flex-col list-disc list-inside gap-1">
                        {data[0].product_care.map((item: any, i: number) => (
                            <li key={i} className="font-semibold">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default ProductDetails