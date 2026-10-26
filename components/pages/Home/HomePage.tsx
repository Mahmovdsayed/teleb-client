"use client"

import Banner from "@/components/ui/Banner"
import CollectionsCarousel from "./CollectionsCarousel"
import BestSellers from "./BestSellers"
import ExploreProducts from "./ExploreProducts"

const HomePage = () => {
    return (
        <>
            <section className="w-full">
                <Banner />
            </section>
            <CollectionsCarousel />
            <BestSellers />
            <ExploreProducts />
        </>
    )
}

export default HomePage