"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ site }: { site: any }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-ink px-5 pb-8 pt-16 text-cream md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-serif text-2xl font-semibold flex items-center gap-2">
            {site.logo ? (
              <img src={site.logo} alt={site.name} className="h-8 w-auto object-contain invert brightness-0" />
            ) : (
              <>{site.name}</>
            )}
          </div>
          <p className="mt-3 max-w-[30ch] text-sm font-light opacity-65">
            A small team of scouts and hosts making travel feel personal again.
            Est. 2021.
          </p>
          <div className="mt-6 text-xs opacity-65 space-y-1">
            {site.email && <div><a href={`mailto:${site.email}`} className="hover:text-gold transition-colors">{site.email}</a></div>}
            {site.phone && <div><a href={`tel:${site.phone}`} className="hover:text-gold transition-colors">{site.phone}</a></div>}
            {site.address && <div className="max-w-[25ch] leading-relaxed">{site.address}</div>}
          </div>
          <div className="mt-6 flex gap-4">
            {site.socials?.twitter && <a href={site.socials.twitter} target="_blank" rel="noreferrer" className="text-cream opacity-65 hover:opacity-100 transition-opacity">Twitter</a>}
            {site.socials?.instagram && <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="text-cream opacity-65 hover:opacity-100 transition-opacity">Instagram</a>}
            {site.socials?.facebook && <a href={site.socials.facebook} target="_blank" rel="noreferrer" className="text-cream opacity-65 hover:opacity-100 transition-opacity">Facebook</a>}
          </div>
        </div>
        {[
          {
            h: "Explore",
            items: [
              ["All stays", "/stays"],
              ["Coastal", "/stays?category=Coastal"],
              ["Countryside", "/stays?category=Countryside"],
              ["City", "/stays?category=City"],
            ],
          },
          {
            h: "Company",
            items: [
              ["About", "/about"],
              ["Field notes", "/field-notes"],
              ["Careers", "/careers"],
              ["Press", "/press"],
            ],
          },
          {
            h: "Support",
            items: [
              ["Help center", "/help"],
              ["Cancellations", "/cancellations"],
              ["Host with us", "/host"],
              ["Contact", "/contact"],
            ],
          },
        ].map((col) => (
          <div key={col.h}>
            <h4 className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-gold">
              {col.h}
            </h4>
            <ul className="space-y-2.5">
              {col.items.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm font-light opacity-75 transition-opacity hover:opacity-100"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-6 text-xs opacity-55 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <span>© 2026 {site.name}</span>
          <span className="hidden md:inline">·</span>
          <span>
            Design and development by{" "}
            <a
              href="https://aquibdesigner.framer.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Mohd Aquib Javed
            </a>
          </span>
        </div>
        <div className="flex gap-3">
          <Link href="/privacy" className="transition-colors hover:text-gold hover:underline underline-offset-2">Privacy</Link>
          <span>·</span>
          <Link href="/terms" className="transition-colors hover:text-gold hover:underline underline-offset-2">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
