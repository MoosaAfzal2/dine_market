import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
    const Products: string[] = ["products", "Male", "Female", "Kids"];

    return Products.map((products) => ({
        products: products,
    }));
}


const Products = async ({ params }: { params: { products: string } }) => {

    const GetSanityData = async () => {
        if (params.products === "products") {
            const res = await client.fetch(`*[_type=='products']{
                _id,
                title,
                category,
                gender->{name},
                price,
                product_care,
                image
              }`)
            return await res
        } else {
            const res = await client.fetch(`*[_type=='products' && gender->name==$forgender]{
                _id,
                title,
                category,
                gender->{name},
                price,
                product_care,
                image
              }`, { forgender: params.products })
            return await res
        }

    }
    const data = await GetSanityData()

    return (
        <main className="py-8 2xl:px-32 xl:px-24 md:px-16 px-8">
            <div className="grid justify-center items-center xl:grid-cols-4 lg:grid-cols-3 min-[600px]:grid-cols-2 grid-cols-1 md:gap-16 gap-6">
                {data.map((items: any) => {
                    const href = "/product/" + items.title.split(" ").join("-");
                    const image_url = urlForImage(items.image[0].asset._ref).url();
                    return (
                        <Link key={items._id} className="mx-auto space-y-2" href={href}>
                            <Image width="250" height="270" src={image_url} alt="" />
                            <h3 className="font-semibold">{items.title}</h3>
                            <h5 className="text-[#888] text-[0.90rem] font-semibold">{items.category}</h5>
                            <h4 className="text-xl font-semibold">${items.price}</h4>
                        </Link>
                    )
                })}
            </div>
        </main>
    )
}

export default Products