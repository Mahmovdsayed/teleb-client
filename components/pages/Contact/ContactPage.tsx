'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import ContactUsForm from "@/components/forms/contact/ContactUsForm";

const EMAIL = "telebfurniture.egy@gmail.com";
const PHONE = "+20 100 625 5355";
const MAP_LAT = 29.9630758;
const MAP_LNG = 31.328267;
const MAP_LINK = "https://maps.app.goo.gl/a1RRvEv4kKAJrZDCA";

const SOCIALS = [
    { name: "Facebook", href: "https://facebook.com/yourpage", icon: FaFacebookF },
    { name: "Instagram", href: "https://instagram.com/yourpage", icon: FaInstagram },
    { name: "TikTok", href: "https://tiktok.com/@yourpage", icon: FaTiktok },
    { name: "WhatsApp", href: "https://wa.me/201000000000", icon: FaWhatsapp },
];

const iconBox = "flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground";
const headerClass = "text-sm font-semibold tracking-tight text-foreground";
const descClass = "text-xs md:text-sm text-muted-foreground leading-relaxed";

const ContactPage = () => {
    const t = useTranslations("contact");

    return (
        <section className="w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-6 md:space-y-8">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                        {t("title")}
                    </h1>
                    <p className="max-w-3xl text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {t("description")}
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <div className="h-full">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className={headerClass}>{t("sendMessage")}</CardTitle>
                                <CardDescription>{t("sendMessageDescription")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContactUsForm />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="flex flex-col gap-3">
                                    <span className={iconBox}><MapPin size={18} /></span>
                                    <div className="space-y-1">
                                        <h3 className={headerClass}>{t("address")}</h3>
                                        <p className={descClass}>{t("addressValue")}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col gap-3">
                                    <span className={iconBox}><Mail size={18} /></span>
                                    <div className="space-y-1">
                                        <h3 className={headerClass}>{t("email")}</h3>
                                        <a href={`mailto:${EMAIL}`} className={`${descClass} block break-all`}>
                                            {EMAIL}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col gap-3">
                                    <span className={iconBox}>
                                        <Phone size={18} />
                                    </span>
                                    <div className="space-y-1">
                                        <h3 className={headerClass}>{t("phone")}</h3>
                                        <a
                                            href={`tel:${PHONE.replace(/\s/g, "")}`}
                                            dir="ltr"
                                            lang="en"
                                            className={`${descClass} block w-fit text-start`}
                                        >
                                            {PHONE}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col gap-3">
                                    <span className={iconBox}><Clock size={18} /></span>
                                    <div className="space-y-1">
                                        <h3 className={headerClass}>{t("workingHours")}</h3>
                                        <p className={descClass}>{t("workingHoursValue")}</p>
                                        <p className={descClass}>{t("workingHoursThursday")}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardContent className="flex items-center justify-between gap-4">
                                <h3 className={headerClass}>{t("followUs")}</h3>
                                <div className="flex items-center gap-2">
                                    {SOCIALS.map(({ name, href, icon: Icon }) => (
                                        <a
                                            key={name}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={name}
                                            className={iconBox}
                                        >
                                            <Icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="relative overflow-hidden p-0 gap-0 min-h-75">
                            <a
                                href={MAP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-3 inset-s-3 z-10 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur"
                            >
                                <MapPin size={14} />
                                {t("address")}
                            </a>
                            <iframe
                                src={`https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`}
                                title={t("address")}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                className="h-full min-h-75 w-full border-0"
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;