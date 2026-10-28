"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTiktok, FaWhatsapp } from "react-icons/fa";

const PHONE_DISPLAY = "+20 100 625 5355";
const PHONE_TEL = "+201006255355";
const PHONE_WA = "201006255355";
const EMAIL = "telebfurniture.egy@gmail.com";

const socials = [
    { label: "Facebook", href: "https://www.facebook.com/teleb.furniture.egy", Icon: FaFacebook },
    { label: "Instagram", href: "https://www.instagram.com/teleb_furniture", Icon: FaInstagram },
    { label: "TikTok", href: "https://www.tiktok.com/@telebfurniture0", Icon: FaTiktok },
];

const focusRing = "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const navLink = `text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline ${focusRing}`;
const headingClass = "mb-4 text-sm font-semibold text-foreground";

export const Footer = () => {
    const [year, setYear] = useState<number | null>(null);
    const t = useTranslations("footer");
    const locale = useLocale();
    useEffect(() => { setYear(new Date().getFullYear()) }, []);

    const quickLinks = [
        { href: "/", label: t("home") },
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
    ];

    const categories = [
        { href: "/products?collectionId=43", label: t("bedroom") },
        { href: "/products?collectionId=10", label: t("livingRoom") },
        { href: "/products?collectionId=54", label: t("outdoor") },
    ];

    const contacts = [
        {
            Icon: FaMapMarkerAlt,
            href: "https://maps.app.goo.gl/9q7qcTtJCajkZhC37",
            label: t("location"),
            external: true,
        },
        { Icon: FaPhoneAlt, href: `tel:${PHONE_TEL}`, label: PHONE_DISPLAY, ltr: true },
        {
            Icon: FaWhatsapp,
            href: `https://wa.me/${PHONE_WA}`,
            label: "WhatsApp",
            external: true,
        },
        { Icon: FaEnvelope, href: `mailto:${EMAIL}`, label: EMAIL, ltr: true },
    ];

    return (
        <footer className="w-full mt-12 bg-muted/20 border-t border-border/40">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-12">
                    <div className="col-span-2 lg:col-span-4">
                        <Link
                            href={`/${locale}`}
                            className={`inline-block text-xl font-semibold tracking-tight text-foreground ${focusRing}`}
                        >
                            {t("logo")}
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                            {t("brandDescription")}
                        </p>
                        <ul className="mt-6 flex gap-3">
                            {socials.map(({ label, href, Icon }) => (
                                <li key={label}>
                                    <a
                                        aria-label={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/60 text-muted-foreground outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    >
                                        <Icon size={18} aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav aria-label={t("quickLinks")} className="col-span-1 lg:col-span-2">
                        <h2 className={headingClass}>{t("quickLinks")}</h2>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={`/${locale}${link.href === "/" ? "" : link.href}`}
                                        className={navLink}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label={t("categories")} className="col-span-1 lg:col-span-2">
                        <h2 className={headingClass}>{t("categories")}</h2>
                        <ul className="space-y-3">
                            {categories.map((link) => (
                                <li key={link.href}>
                                    <Link href={`/${locale}${link.href}`} className={navLink}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="col-span-2 lg:col-span-4">
                        <h2 className={headingClass}>{t("contactUs")}</h2>
                        <ul className="space-y-3">
                            {contacts.map(({ Icon, href, label, external, ltr }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        {...(external
                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                            : {})}
                                        className={`flex items-start gap-3 text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground ${focusRing}`}
                                    >
                                        <Icon
                                            size={16}
                                            aria-hidden="true"
                                            className="mt-0.5 shrink-0 text-primary"
                                        />
                                        <span dir={ltr ? "ltr" : undefined} className="wrap-break-words">
                                            {label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-2 border-t border-border/40 pt-6 text-center sm:flex-row sm:justify-between sm:text-start">
                    <p className="text-xs text-muted-foreground">
                        {t("copyright", { year: year ?? 2026 })}
                    </p>
                    <a
                        href="https://www.instagram.com/neststudioo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline ${focusRing}`}
                    >
                        {t("poweredBy")}
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;