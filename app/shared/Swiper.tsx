"use client"
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css"
// import required modules
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";

const SwiperSlider = ({ data }: { data: any }) => {
    return (
        <Swiper
            slidesPerView={1}
            breakpoints={{
                1280: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                }
            }}
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            className="py-8" >
            {data.map((items: any) => {
                const image_url = urlForImage(items.image[0].asset._ref).url()
                return (
                    <SwiperSlide key={items._id} className="space-y-2 flex justify-center hover:scale-110 transition-all duration-500">
                        <Link href="">
                            <Image width="380" height="400" unoptimized={true} src={image_url} alt="" />
                            <h3 className="text-lg font-medium">{items.title}</h3>
                            <h4 className="text-xl font-semibold">${items.price}</h4>
                        </Link>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default SwiperSlider