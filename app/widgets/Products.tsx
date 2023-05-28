import { client } from "@/sanity/lib/client"
import SwiperSlider from "../shared/Swiper"

const GetSanityData = async () => {
    const res = await client.fetch(`*[_type=='products']{
        _id,
        title,
        category,
        gender,
        price,
        product_care,
        image
      }`)
    return await res
}

const Products = async () => {
    const data = await GetSanityData()
    return (
        <section className="lg:pt-8 sm:pb-24 2xl:px-32 xl:px-24 md:px-16 px-8">
            <h4 className="text-center text-blue-600 text-sm font-semibold pb-3.5">PRODUCTS</h4>
            <h2 className="text-center text-3xl font-bold pb-8">Check What We Have</h2>
            <SwiperSlider data={data} />
        </section>
    )
}

export default Products