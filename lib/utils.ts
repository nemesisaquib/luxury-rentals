export function splitList(s: string): string[] {
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

export function nightsBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

const globalForSite = globalThis as unknown as {
  _SITE: any;
};

export const SITE = globalForSite._SITE || {
  name: "Hearth & Key",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3459",
  tagline: "Stay somewhere worth remembering.",
  description:
    "Hand-picked homes, farmhouses, and coastal retreats — each one visited, vetted, and photographed by our scouts before it earns a key. Book direct, no service fees.",
  logo: "/logo.png", 
  email: "hello@hearthandkey.com",
  phone: "+1 (555) 123-4567",
  address: "123 Coastal Way, Los Angeles, CA 90001",
  socials: {
    twitter: "https://twitter.com/hearthandkey",
    instagram: "https://instagram.com/hearthandkey",
    facebook: "https://facebook.com/hearthandkey"
  }
};

if (process.env.NODE_ENV !== "production") globalForSite._SITE = SITE;
