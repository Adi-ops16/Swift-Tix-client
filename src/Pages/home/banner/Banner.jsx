import React from 'react';
import banner1 from '../../../assets/banner1.png';
import banner2 from '../../../assets/banner2.png';
import banner3 from '../../../assets/banner3.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Banner = () => {

    const banners = [
        {
            id: 1,
            image: banner1,
            title: "Welcome to Swift-Tix",
            description: "Your go to application on booking online tickets to ensure smooth travel experience",
            btn: "About us",
        },
        {
            id: 2,
            image: banner2,
            title: "Seamless Payment with Stripe",
            description:
                "Book your tickets instantly with secure and fast Stripe payment — ensuring a smoother travel experience.",
            btn: "Book Now",
        },
        {
            id: 3,
            image: banner3,
            title: "Hassle-Free & Relaxed Journey",
            description:
                "Swift-Tix ensures your travel is smooth, stress-free, and comfortable with verified tickets and easy booking.",
            btn: "Explore Tickets",
        },
    ];

    return (
        <section className="my-10 px-4">
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={40}
                slidesPerView={1}
                speed={2000}
                className="max-w-7xl mx-auto"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div
                            className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg"
                            style={{
                                backgroundImage: `url(${banner.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 flex items-center justify-start">
                                <div className="text-white max-w-md pl-10">
                                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
                                        {banner.title}
                                    </h1>

                                    <p className="mt-4 text-base md:text-lg font-medium opacity-90">
                                        {banner.description}
                                    </p>

                                    <button className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary/80 transition">
                                        {banner.btn}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Banner;
