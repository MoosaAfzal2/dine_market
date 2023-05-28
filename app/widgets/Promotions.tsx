import event1 from "@/public/event1.png"
import event2 from "@/public/event2.png"
import event3 from "@/public/event3.png"
import Image from "next/image"

const Promotions = () => {
    return (
        <section className="sm:py-24 2xl:px-32 xl:px-24 md:px-16 px-8">
            <h4 className="text-center text-blue-600 text-sm font-semibold pb-3.5">PROMOTIONS</h4>
            <h2 className="text-center text-3xl font-bold pb-8">Our Promotions Events</h2>
            <div className="flex lg:flex-row flex-col gap-4">
                <div className="flex-1 space-y-4 lg:mr-4">
                    <div className="flex items-center justify-between bg-[#d6d6d8] px-8">
                        <div>
                            <h2 className="text-3xl font-semibold">GET UP TO <span className="text-4xl font-bold">60%</span></h2>
                            <h3 className="text-lg">For the summer season</h3>
                        </div>
                        <Image className="place-self-end xl:mr-8" src={event1} width={180} alt="event1" />
                    </div>
                    <div className="text-white text-center bg-black/90 px-8 py-8 pt-12">
                        <h2 className="text-4xl font-semibold">GET 30% Off</h2>
                        <h5 className="text-sm mt-4 mb-1">USE PROMO CODE</h5>
                        <h3 className="mx-auto bg-[#474747] font-semibold w-fit tracking-[0.3rem] px-12 py-1.5 rounded-lg">DINEWEEKENDSALE</h3>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-4">
                    <div className="flex-1 flex flex-col justify-between bg-[#efe1c7] pt-6">
                        <div className="pl-4">
                            <h4>Flex Sweatshirt</h4>
                            <p className="flex items-end gap-x-3">
                                <span className="line-through">$100.00</span>
                                <span className="text-lg font-semibold">$75.00</span>
                            </p>
                        </div>
                        <Image className="mx-auto h-80" src={event2} alt="" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between bg-[#d6d6d8] pt-6">
                        <div className="pl-4">
                            <h4>Flex Push Button Bomber</h4>
                            <p className="flex items-end gap-x-3">
                                <span className="line-through">$225.00</span>
                                <span className="text-lg font-semibold">$190.00</span>
                            </p>
                        </div>
                        <Image className="mx-auto h-80" src={event3} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Promotions