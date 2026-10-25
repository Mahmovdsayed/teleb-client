'use client';

import { useState } from "react";
import { useAppQuery } from "@/hooks/useAppQuery";
import { getBanners } from "@/services/banner";
import type { Banner as BannerType } from "@/types/Banner.types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
    const t = useTranslations("home");
    const [failedImages, setFailedImages] = useState<string[]>([]);

    const { data, isLoading } = useAppQuery<BannerType[]>({
        queryFn: getBanners,
        queryKey: ["banners"],
    });

    if (isLoading) return null;
    console.log(data)

    const allImages = (data ?? []).flatMap((banner) =>
        [...(banner.images ?? [])]
            .sort((a, b) => a.order - b.order)
            .map((image) => ({
                ...image,
                title: banner.title,
            }))
    );

    const validImages = allImages.filter(
        (image) => !failedImages.includes(image.url)
    );


    if (validImages.length === 0) {
        return (
            <section className="w-full">
                <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="relative flex aspect-[21/9] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 md:aspect-[21/7]">
                        <div className="px-4 text-center">
                            <h2 className="mb-2 text-base font-bold text-primary/80 md:text-4xl">
                                {t("heroTitle")}
                            </h2>
                            <p className="text-xs text-muted-foreground md:text-base">
                                {t("heroSubtitle")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        autoplay={
                            validImages.length > 1
                                ? {
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }
                                : false
                        }
                        pagination={{ clickable: true }}
                        navigation={validImages.length > 1}
                        loop={validImages.length > 1}
                        className="h-64 w-full sm:h-80 md:h-[420px]"
                        style={
                            {
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            } as React.CSSProperties
                        }
                    >
                        {validImages.map((image, index) => (
                            <SwiperSlide
                                key={image.publicId || image.url}
                                className="relative h-full"
                            >
                                <img
                                    src={image.url}
                                    alt={image.title || `Banner ${index + 1}`}
                                    className="absolute inset-0 block h-full w-full object-cover object-center"
                                    loading={index === 0 ? "eager" : "lazy"}
                                    decoding="async"
                                    onError={() =>
                                        setFailedImages((previous) =>
                                            previous.includes(image.url)
                                                ? previous
                                                : [...previous, image.url]
                                        )
                                    }
                                />

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section >
    );
};

export default Banner;
