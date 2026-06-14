import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/utils";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "vacation rentals",
    "boutique stays",
    "holiday homes",
    "vetted rentals",
    "book direct",
    "no service fees",
    "coastal retreats",
    "countryside farmhouse",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

import { getSession } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable}`}>
      <body className="font-sans antialiased">
        <Nav session={session} site={SITE} />
        <main>{children}</main>
        <Footer site={SITE} />
      </body>
    </html>
  );
}
