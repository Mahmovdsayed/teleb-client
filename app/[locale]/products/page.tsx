import { PageTransition } from "@/components/ui/PageTransition";

const page = () => {
    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Products</h1>
                <p className="max-w-5xl mt-2 tracking-tight text-xs md:text-sm text-muted-foreground ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto illum, quasi dolore vero modi vitae eos fugiat fugit necessitatibus accusantium accusamus, facere repellat dicta fuga, magni quas perspiciatis impedit velit.</p>
            </div>
        </PageTransition>
    );
};

export default page;