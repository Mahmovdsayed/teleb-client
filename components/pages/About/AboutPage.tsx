"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Eye, Gem, Leaf, ShieldCheck, Target, Users } from "lucide-react";

const FOUNDED_YEAR = 1995;

const VALUES = [
    { titleKey: "value1Title", textKey: "value1Text", icon: ShieldCheck },
    { titleKey: "value2Title", textKey: "value2Text", icon: Gem },
    { titleKey: "value3Title", textKey: "value3Text", icon: Users },
    { titleKey: "value4Title", textKey: "value4Text", icon: Leaf },
] as const;

const AboutPage = () => {
    const t = useTranslations("about");

    return (
        <section className="w-full">
            <div className="relative w-full h-[55vh] min-h-72 max-h-[520px] overflow-hidden">
                <Image
                    src="/story_img.webp"
                    alt="Teleb Furniture workshop"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-amber-950/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                    <p className="text-white/60 text-xs font-medium tracking-widest mb-2">
                        {t("foundedLabel", { year: FOUNDED_YEAR })}
                    </p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-2xl">
                        {t("title")}
                    </h1>
                    <p className="mt-3 text-white/70 text-sm md:text-base max-w-xl leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div>
                        <p className="text-amber-700 dark:text-amber-400 text-xs font-semibold tracking-widest mb-4">
                            {t("storyTitle")}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6 leading-snug">
                            {t("storyTitle")}
                        </h2>
                        <div className="w-10 h-px bg-amber-600 dark:bg-amber-500 mb-6" />
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                            {t("storyP1")}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {t("storyP2")}
                        </p>
                    </div>

                    <div className="space-y-0 divide-y divide-border/50">
                        <div className="py-6 flex gap-5 items-start">
                            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                                <Target size={17} />
                            </span>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                                    {t("missionTitle")}
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                    {t("missionText")}
                                </p>
                            </div>
                        </div>

                        <div className="py-6 flex gap-5 items-start">
                            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground/70">
                                <Eye size={17} />
                            </span>
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                                    {t("visionTitle")}
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                    {t("visionText")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/50 py-14 md:py-20">
                    <div className="mb-10">
                        <p className="text-amber-700 dark:text-amber-400 text-xs font-semibold tracking-widest mb-3">
                            {t("valuesTitle")}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            {t("valuesTitle")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 border border-border/50 rounded-2xl overflow-hidden">
                        {VALUES.map(({ titleKey, textKey, icon: Icon }, i) => (
                            <div
                                key={titleKey}
                                className={[
                                    "flex gap-5 items-start p-6 md:p-8",
                                    i % 2 === 0 ? "sm:border-e border-border/50" : "",
                                    i >= 2 ? "border-t border-border/50" : "",
                                ].join(" ")}
                            >
                                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground/70">
                                    <Icon size={18} />
                                </span>
                                <div>
                                    <h3 className="text-sm font-semibold text-foreground mb-1.5">
                                        {t(titleKey)}
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                        {t(textKey)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutPage;
